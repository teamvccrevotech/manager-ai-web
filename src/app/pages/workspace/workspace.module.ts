import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { FolderComponent } from './folder/folder.component';
import {TranslateModule} from "@ngx-translate/core";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from "ng-zorro-antd/descriptions";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {ShareComponentModule} from "../share-component/share-component.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzCardComponent, NzCardMetaComponent} from "ng-zorro-antd/card";
import {NzAvatarComponent} from "ng-zorro-antd/avatar";
import {NzAlertComponent} from "ng-zorro-antd/alert";
import {NzDropdownButtonDirective, NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {NzModalComponent, NzModalContentDirective, NzModalService} from "ng-zorro-antd/modal";
import {NzTableModule} from "ng-zorro-antd/table";
import { AgentFormComponent } from './agent-form/agent-form.component';
import { AgentChatComponent } from './agent-chat/agent-chat.component';
import { AgentConfigurationComponent } from './agent-configuration/agent-configuration.component';

@NgModule({
  declarations: [
    OverviewComponent,
    FolderComponent,
    AgentFormComponent,
    AgentChatComponent,
    AgentConfigurationComponent
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    TranslateModule,
    NzButtonComponent,
    NzIconDirective,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzDividerComponent,
    NzSpaceComponent,
    NzSpaceItemDirective,
    ShareComponentModule,
    FormsModule,
    NzCardComponent,
    NzCardMetaComponent,
    NzAvatarComponent,
    NzAlertComponent,
    NzDropdownMenuComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    NzDropdownButtonDirective,
    NzDropDownDirective,
    NzModalComponent,
    NzModalContentDirective,
    NzTableModule,
    ReactiveFormsModule
  ],
  providers: [
    NzModalService
  ]
})
export class WorkspaceModule { }
