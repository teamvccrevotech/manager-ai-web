import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {StorageService} from "../../../services/storage.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {LANGUAGE_OPTIONS} from "../workspace.model";
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrl: './agent-form.component.scss'
})
export class AgentFormComponent implements OnInit {
  currentUser: any;
  workspace: any
  formGroup: FormGroup
  folders: any[] = [];
  readonly modal = inject(NzModalRef);
  readonly nzModalData: any = inject(NZ_MODAL_DATA);
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
        this.workspace = (user.workspaces || []).find(workspace => workspace.workspaceId == this.nzModalData.workspaceId) || {};
        this.folders = this.workspace.folders || [];
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
  handleOk(): void {
    if (this.formGroup.invalid) {
      this.message.error(this.translate.instant("validation.formInvalid"));
      return;
    }
    // chỗ này gọi api xử lý
    this.modal.close(this.formGroup);
  }
  handleCancel(): void {
    this.modal.close();
  }
  protected readonly languageOptions = LANGUAGE_OPTIONS;
}
