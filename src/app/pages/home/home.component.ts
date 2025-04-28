import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  workspaces: any[] = [];

  ngOnInit(): void {
    this.storage.currentUser.subscribe((user) => {
      this.workspaces = user?.workspaces || [];
    })
  }

  constructor(private storage: StorageService,
              private router: Router,) {
  }

  goToWorkSpace(item: any): void {
    this.router.navigate(['workspace',item.workspaceId]);
  }

}
