import {Component, Input, OnInit} from '@angular/core';
import {StorageService} from "../../../services/storage.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrl: './agent-form.component.scss'
})
export class AgentFormComponent implements OnInit {
  currentUser: any;
  @Input() workspaceId : any;
  workspace: any
  formGroup: FormGroup

  constructor(
    private storage: StorageService,
    private message: NzMessageService,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.storage.currentUser.subscribe(user => {
      this.currentUser = user;
      if (this.currentUser) {
        this.workspace = (user.workspaces || []).find(workspace => workspace.workspaceId == this.workspaceId) || {};
      }
    })
  }
  initForm(){
    this.formGroup = new FormGroup({
      position: new FormControl(null,[Validators.required]),
      jobBrief: new FormControl(null,[Validators.required]),
      agentName: new FormControl(null,[Validators.required]),
      language: new FormControl(null,[Validators.required]),
      folder: new FormControl(null,[Validators.required]),
    })
  }
  onSubmit(){
    if(this.formGroup.invalid){
      this.message.error(this.translate.instant("validation.formInvalid"));
    }
  }
}
