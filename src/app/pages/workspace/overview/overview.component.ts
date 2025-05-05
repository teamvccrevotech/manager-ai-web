import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../services/storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SearchObject, SORT_LIST} from "../workspace.model";
import {NzMessageService} from "ng-zorro-antd/message";
import {AgentFormComponent} from "../agent-form/agent-form.component";
import {NzModalService} from "ng-zorro-antd/modal";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {
  currentUser: any
  workspace: any = {}
  currentId: any;
  selectedFolder: any;
  searchObject : SearchObject = {
    orderBy: "lastUsed",
    isAsc: true,
  }
  isModalRename: boolean = false;
  recentChats: any[] = [
    {chatHistory: 'Chat history 1', agent: 'Agent 1', lastUpdate: new Date()},
    {chatHistory: 'Chat history 2', agent: 'Agent 2', lastUpdate: new Date()},
    {chatHistory: 'Chat history 3', agent: 'Agent 3', lastUpdate: new Date()},
  ];
  constructor(private storage: StorageService,
              private route: ActivatedRoute,
              private router: Router,
              private message: NzMessageService,
              private modal: NzModalService,
              private translate: TranslateService) {
    this.currentId = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.storage.currentUser.subscribe(user => {
      this.currentUser = user;
      if(this.currentUser) {
        this.workspace = (user.workspaces || []).find(workspace => workspace.workspaceId == this.currentId) || {};
      }
    })
  }

  handleRenameFolder(folder: any) {
    this.selectedFolder = folder;
    this.isModalRename = true;
  }

  handleDeleteFolder(folder: any) {
    // TODO: Implement folder delete logic
    this.message.info(`Deleting folder: ${folder.folderName}`);
  }

  goToFolder(folder: any) {
    this.router.navigate([`/workspace/${this.currentId}/folder/${folder.folderId}`]);
  }
  acceptRename() {
    this.isModalRename = false;
  }
  goToAgent(agent: any,folder: any) {
    this.router.navigate([`/workspace/${this.currentId}/agent-chat/${agent.agentId}`]);
  }
  createAgent() {
    const modal = this.modal.create({
      nzTitle: this.translate.instant("workspace.agentInformation"),
      nzContent: AgentFormComponent,
      nzData: {
        workspaceId: this.currentId
      },
    });
  }

  protected readonly SORT_LIST = SORT_LIST;
}
