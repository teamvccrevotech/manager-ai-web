import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ShareComponentModule} from "../share-component/share-component.module";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {TranslateModule} from "@ngx-translate/core";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormDirective} from "ng-zorro-antd/form";
import {NzIconDirective} from "ng-zorro-antd/icon";
import { NzModalModule } from 'ng-zorro-antd/modal';
import {NzInputDirective} from "ng-zorro-antd/input";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ShareComponentModule,
    NzButtonComponent,
    TranslateModule,
    NzColDirective,
    NzFormDirective,
    NzRowDirective,
    NzIconDirective,
    NzModalModule,
    NzInputDirective,
    NzFormControlComponent
  ]
})
export class AuthModule { }
