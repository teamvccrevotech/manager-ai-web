import { inject, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptors
} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import {authInterceptor} from "./guards/auth.interceptor";
import { HomeComponent } from './pages/home/home.component';
import {LayoutModule} from "./pages/layout/layout.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import vi from '@angular/common/locales/vi';
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { NZ_I18N, en_US, vi_VN } from 'ng-zorro-antd/i18n';
import {NzPageHeaderComponent} from "ng-zorro-antd/page-header";
import {NzCardComponent, NzCardMetaComponent} from "ng-zorro-antd/card";
import { TestDocxPreviewComponent } from './pages/test-docx-preview/test-docx-preview.component';
import { FormsModule } from '@angular/forms';
import { ShareComponentModule } from "./pages/share-component/share-component.module";
registerLocaleData(en);
registerLocaleData(vi);

export function rootLoaderI18n(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

const ngZorroConfig: NzConfig = {
  message:{
    nzDuration: 5000,
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestDocxPreviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
        defaultLanguage: "vi",
        loader: {
            provide: TranslateLoader,
            useFactory: rootLoaderI18n,
            deps: [HttpClient]
        }
    }),
    NgxSpinnerModule.forRoot({
        type: "ball-spin-clockwise"
    }),
    AppRoutingModule,
    FormsModule,
    LayoutModule,
    NzPageHeaderComponent,
    NzCardComponent,
    NzCardMetaComponent,
    ShareComponentModule
],
  providers: [
    provideNzConfig(ngZorroConfig),
    {
      provide: NZ_I18N, useFactory: () => {
        const localId = inject(LOCALE_ID);
        switch (localId) {
          case 'en':
            return en_US;
          case 'vi':
            return vi_VN;
          default:
            return vi_VN;
        }
      }
    },
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
