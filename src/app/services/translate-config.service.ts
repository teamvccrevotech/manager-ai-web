import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {StorageService} from "./storage.service";
import {en_US, NzI18nService, vi_VN} from "ng-zorro-antd/i18n";

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {

  constructor(private translate: TranslateService,private nzI18nService: NzI18nService,
              private localStorage : StorageService) {
    this.changeLanguage(this.localStorage.getLanguage());
  }

  changeLanguage(language: string){
    this.localStorage.setLanguage(language);
    this.translate.use(language);
    switch (language) {
      case 'en':
        this.nzI18nService.setLocale(en_US);
        break;
      case 'vi':
        this.nzI18nService.setLocale(vi_VN);
        break;
      default:
        this.nzI18nService.setLocale(en_US);
        break;
    }
  }

  getLanguage(){
    return this.localStorage.getLanguage();
  }
}
