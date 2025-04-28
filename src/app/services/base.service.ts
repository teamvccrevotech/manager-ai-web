import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {environment} from "../../environments/environment";
import {catchError, map, of} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private serverUrl = environment.apiUrl;
  constructor(private http : HttpClient,
              private translate : TranslateService,
              private loading: NgxSpinnerService,
              private message: NzMessageService) {
  }
  get(url:string){
    // this.loading.show();
    return this.http.get(this.serverUrl+url).pipe(
      map(value => {
        this.loading.hide();
        return value as any;
      }),catchError(error => {
        this.loading.hide();
        this.message.error(error?.error?.message? error?.error?.message : this.translate.instant("common.commonError"))
        return of(error)
      })
    );
  }
  delete(url: string){
    // this.loading.show();
    return this.http.delete(this.serverUrl+url).pipe(
      map(value => {
        this.loading.hide();
        return value as any;
      }),catchError(error => {
        this.loading.hide();
        this.message.error(error?.error?.message? error.error?.message : this.translate.instant("common.commonError"))
        return of(error)
      })
    );
  }
  put(url : string,request :any ){
    // this.loading.show();
    return this.http.put(this.serverUrl+url, request).pipe(
      map(value => {
        this.loading.hide();
        return value as any;
      }),catchError(error => {
        this.loading.hide();
        this.message.error(error?.error?.message? error.error?.message : this.translate.instant("common.commonError"))
        return of(error)
      })
    );
  }

  post(url : string,request :any ){
    // this.loading.show();
    return this.http.post(this.serverUrl+url, request).pipe(
      map(value => {
        this.loading.hide();
        return value as any;
      }),catchError(error => {
        console.log(error);
        this.loading.hide();
        this.message.error(error?.error?.message? error.error?.message : this.translate.instant("common.commonError"))
        return of(error)
      })
    );
  }
}
