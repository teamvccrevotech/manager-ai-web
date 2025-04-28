import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import {inject} from '@angular/core';
import {StorageService} from '../services/storage.service';
import {Router} from '@angular/router';
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from 'rxjs';
import {environment} from '../../environments/environment';

let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const storage = inject(StorageService);
  const router = inject(Router);
  let modifiedReq = request;

  // Thêm Accept-language
  const lang = storage.getLanguage();
  if (lang) {
    modifiedReq = modifiedReq.clone({
      setHeaders: {'Accept-language': lang}
    });
  }

  // Không cần thêm token với các request auth và publish
  if (!request.url.includes('/api/v1/auth') && !request.url.includes('/api/v1/publish')) {
    const token = storage.getToken();
    if (token) {
      modifiedReq = modifiedReq.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }

    return next(modifiedReq).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return handle401Error(modifiedReq, next, storage, router);
        }
        return throwError(() => error);
      })
    );
  }

  return next(modifiedReq);
};

function handle401Error(
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  storage: StorageService,
  router: Router
): Observable<HttpEvent<any>> {

  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    const refreshToken = storage.getRefreshToken();

    if (refreshToken) {
      return inject(HttpClient).get<any>(`${environment.apiUrl}/api/v1/auth/refresh-token/${refreshToken}`).pipe(
        switchMap((res: any) => {
          isRefreshing = false;
          if (res.code === 200) {
            const auth = res.body as any;
            storage.saveToken(auth);
            refreshTokenSubject.next(auth.accessToken);

            const cloned = request.clone({
              setHeaders: {Authorization: `Bearer ${auth.accessToken}`}
            });

            return next(cloned);
          } else {
            storage.signOut();
            router.navigate(['/login']);
            return throwError(() => new Error('Refresh failed'));
          }
        }),
        catchError(err => {
          isRefreshing = false;
          storage.signOut();
          router.navigate(['/login']);
          return throwError(() => err);
        })
      );
    } else {
      router.navigate(['/login']);
      return throwError(() => new Error('No refresh token'));
    }
  } else {
    return refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap((token) => {
        const cloned = request.clone({
          setHeaders: {Authorization: `Bearer ${token}`}
        });
        return next(cloned);
      })
    );
  }
}
