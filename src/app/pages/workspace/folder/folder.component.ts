import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../../services/storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {LANGUAGE_OPTIONS, SearchObject, SORT_LIST} from '../workspace.model';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.scss'
})
export class FolderComponent implements OnInit {
  workspaceId: any;
  folderId: any;
  currentUser: any;
  workspace: any;
  folder: any;
  isModalRename: boolean = false;
  searchObject: SearchObject = {
    orderBy: "lastUsed",
    isAsc: true,
  }
  formGroup: FormGroup
  isModalAgent: boolean = false;
  languageOptions = LANGUAGE_OPTIONS;
  recentChats: any[] = [
    {chatHistory: 'Chat history 1', agent: 'Agent 1', lastUpdate: new Date()},
    {chatHistory: 'Chat history 2', agent: 'Agent 2', lastUpdate: new Date()},
    {chatHistory: 'Chat history 3', agent: 'Agent 3', lastUpdate: new Date()},
  ];

  constructor(private storage: StorageService,
              private route: ActivatedRoute,
              private router: Router,
              private message: NzMessageService,
              private translate: TranslateService) {
    this.workspaceId = this.route.snapshot.paramMap.get('id');
    this.folderId = this.route.snapshot.paramMap.get('folderId');
  }

  ngOnInit(): void {
    this.initForm();
    this.storage.currentUser.subscribe(user => {
      this.currentUser = user;
      if (this.currentUser) {
        this.workspace = (user.workspaces || []).find(workspace => workspace.workspaceId == this.workspaceId) || {};
        this.folder = (this.workspace.folders || []).find(folder => folder.folderId == this.folderId) || {};
      }
    })
  }

  handleRenameFolder(folder: any) {
    this.isModalRename = true;
  }

  acceptRename() {
    this.isModalRename = false;
  }

  handleDeleteFolder(folder: any) {
    this.message.info(`Deleting folder: ${folder.folderName}`);
  }

  goToAgent(agent: any) {
    this.router.navigate([`/workspace/${this.workspaceId}/agent-chat/${agent.agentId}`]);
  }

  initForm() {
    this.formGroup = new FormGroup({
      position: new FormControl(null, [Validators.required]),
      jobBrief: new FormControl(null, [Validators.required]),
      agentName: new FormControl(null, [Validators.required]),
      language: new FormControl(null, [Validators.required]),
      folder: new FormControl(null, [Validators.required]),
    })
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.message.error(this.translate.instant("validation.formInvalid"));
    }
  }

  protected readonly SORT_LIST = SORT_LIST;
}
