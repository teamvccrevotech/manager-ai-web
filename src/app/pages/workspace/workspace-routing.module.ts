import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OverviewComponent} from "./overview/overview.component";
import {FolderComponent} from "./folder/folder.component";

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
      },{
        path: "folder/:folderId",
        component: FolderComponent,
        data: {
          breadcrumb: 'breadcrumb.folder',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
