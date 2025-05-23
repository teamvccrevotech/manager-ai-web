import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout/layout.component';
import {HomeComponent} from "./pages/home/home.component";
import { TestDocxPreviewComponent } from './pages/test-docx-preview/test-docx-preview.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: HomeComponent
      },
      {
        path: "workspace",
        data: {
          breadcrumb: 'breadcrumb.none',
        },
        loadChildren: () => import('./pages/workspace/workspace.module').then(m => m.WorkspaceModule)
      }
    ]
  },
  {
    path: "auth",
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "test-docx",
    component: TestDocxPreviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
