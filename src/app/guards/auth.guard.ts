import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {StorageService} from "../services/storage.service";

export const authGuard: CanActivateFn = (route, state) => {
  const storage = inject(StorageService);
  const router = inject(Router);
  if (storage.getToken()) {
    return true;
    // if (this.rootService.currentUser) {
    //   return true;
    // } else {
    //   return this.rootService.getCurrentUser().pipe(
    //     map(value => {
    //       const rs = value as BaseResponse
    //       if (rs.code == 200) {
    //         this.rootService.currentUser = rs.body;
    //         return true;
    //       }
    //       this.storage.signOut();
    //       this.router.navigate(['/login']);
    //       return false;
    //     }), catchError(error => {
    //       this.storage.signOut();
    //       this.router.navigate(['/login']);
    //       return of(false);
    //     }))
    // }
  }
  router.navigate(["/login"])
  return false;
};
