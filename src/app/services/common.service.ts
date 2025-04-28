import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  post(uri: string,req: any): Observable<any> {
    return this.http.post(this.apiUrl + uri, req);
  }
}
