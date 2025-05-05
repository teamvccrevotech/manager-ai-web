import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OverviewComponent} from "./overview/overview.component";
import {FolderComponent} from "./folder/folder.component";
import { AgentChatComponent } from './agent-chat/agent-chat.component';
import {AgentConfigurationComponent} from "./agent-configuration/agent-configuration.component";

const routes: Routes = [
  {
    path: ":id",
    data: {
      breadcrumb: 'breadcrumb.workspace',
    },
    children: [
      {
        path: "",
        component: OverviewComponent
      },
      {
        path: "folder/:folderId",
        component: FolderComponent,
        data: {
          breadcrumb: 'breadcrumb.folder',
        },
      },
      {
        path: "agent-chat/:agentId",
        component: AgentChatComponent,
        data: {
          breadcrumb: 'breadcrumb.agentChat',
        },
      },
      {
        path: "agent-configuration/:agentId",
        component: AgentConfigurationComponent,
        data: {
          breadcrumb: 'breadcrumb.agentConfiguration',
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
