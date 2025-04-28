import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonInputComponent } from './common-input/common-input.component';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {TranslateModule} from "@ngx-translate/core";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzInputNumberComponent, NzInputNumberGroupComponent} from "ng-zorro-antd/input-number";
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from "ng-zorro-antd/breadcrumb";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    CommonInputComponent,
    BreadcrumbComponent
  ],
  exports: [
    CommonInputComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    NzFormLabelComponent,
    NzFormItemComponent,
    NzFormControlComponent,
    NzInputGroupComponent,
    NzColDirective,
    FormsModule,
    NzInputDirective,
    NzSelectComponent,
    NzOptionComponent,
    TranslateModule,
    NzSpinComponent,
    NzIconDirective,
    NzDatePickerComponent,
    NzInputNumberGroupComponent,
    NzInputNumberComponent,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    RouterLink,
    NzFormDirective,
    NzRowDirective,
    ReactiveFormsModule,
  ]
})
export class ShareComponentModule { }
