import {Component, OnInit} from '@angular/core';
import {TranslateConfigService} from "../../../services/translate-config.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../auth/auth.service";
import {StorageService} from "../../../services/storage.service";
import {navigation, NavigationItem} from "../layout.model";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;
  currentLanguage = "en";
  currentUser: any;
  navigation = navigation;
  isVisible$ = new BehaviorSubject(true);
  constructor(private authService: AuthService,
              private translateService: TranslateConfigService,
              private router: Router,
              private translate: TranslateService,
              private storage: StorageService) {
    this.currentLanguage = this.storage.getLanguage();
  }

  ngOnInit(): void {
    this.storage.currentUser.subscribe(user => {
      this.currentUser = user;
      if(this.currentUser && this.currentUser.workspaces) {
        let workspaces = this.convertToNavigationItems(this.currentUser.workspaces);
        if(workspaces){
          this.navigation = workspaces.concat(navigation);
        }else{
          this.navigation = navigation;
        }
        let dashboard: NavigationItem[] = [{
          translateKey: 'navigation.dashboard',
          iconType: "dashboard",
          link: '/dashboard',
        }]
        this.navigation = dashboard.concat(this.navigation);
      }
    })
  }

  logout(): void {
    this.authService.logout().subscribe(data => {
    });
    this.storage.signOut();
    this.router.navigate(['/login']);
  }

  changeLanguage(lang: string) {
    this.destroyAndReload();
    this.translateService.changeLanguage(lang);
  }

  translateFn = (key: string) => {
    if (key) {
      return this.translate.instant(key)
    } else {
      return "";
    }
  }

  destroyAndReload() {
    this.isVisible$.next(false);
    setTimeout(() => {
      this.isVisible$.next(true);
    }, 1);
  }
  isOpen(item : NavigationItem): boolean {
    if(item.children){
      let currentUrl = this.router.url;
      for(let sub of item.children){
        if(currentUrl.startsWith(sub.link)){
          return true;
        }
      }
    }
    return false;
  }

  convertToNavigationItems(workspaces: any[]): NavigationItem[] {
    return workspaces.map(workspace => ({
      name: workspace.workspaceName,
      link: `/workspace/${workspace.workspaceId}`,
      iconType: 'codepen',
      children: workspace.folders.map((folder: any) => ({
        name: folder.folderName,
        link: `/workspace/${workspace.workspaceId}/folder/${folder.folderId}`,
        iconClass: 'fa fa-folder',
      }))
    }));
  }
}
