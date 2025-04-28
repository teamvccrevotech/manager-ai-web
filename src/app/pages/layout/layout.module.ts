import { NgModule } from '@angular/core';
import {AsyncPipe, CommonModule, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import {ShareComponentModule} from "../share-component/share-component.module";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent, NzSiderComponent} from "ng-zorro-antd/layout";
import {NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent} from "ng-zorro-antd/menu";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzAvatarComponent} from "ng-zorro-antd/avatar";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import { NzIconModule } from 'ng-zorro-antd/icon';



@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    ShareComponentModule,
    RouterOutlet,
    NzContentComponent,
    NzMenuItemComponent,
    NzDropDownDirective,
    NzAvatarComponent,
    NzOptionComponent,
    NzSelectComponent,
    FormsModule,
    NzHeaderComponent,
    NzLayoutComponent,
    RouterLinkActive,
    TranslateModule,
    NgForOf,
    NgIf,
    NzSubMenuComponent,
    NgOptimizedImage,
    RouterLink,
    NzMenuDirective,
    NzSiderComponent,
    AsyncPipe,
    NzDropdownMenuComponent,
    NzIconModule

  ]
})
export class LayoutModule { }
