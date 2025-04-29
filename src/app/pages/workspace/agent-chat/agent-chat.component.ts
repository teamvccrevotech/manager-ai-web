import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-agent-chat',
  templateUrl: './agent-chat.component.html',
  styleUrl: './agent-chat.component.scss'
})
export class AgentChatComponent implements OnInit {
  workspaceId: any;
  folderId: any;
  currentUser: any;
  workspace: any;
  agent: any;
  agentId: any;

  constructor(private storage: StorageService,
              private route: ActivatedRoute,
              private router: Router,
              private message: NzMessageService) {
    this.workspaceId = this.route.snapshot.paramMap.get('id');
    this.agentId = this.route.snapshot.paramMap.get('agentId');
  }

  ngOnInit(): void {
    this.storage.currentUser.subscribe(user => {
      this.currentUser = user;
      if(this.currentUser) {
        this.workspace = (user.workspaces || []).find(workspace => workspace.workspaceId == this.workspaceId) || {};
        this.agent = (this.workspace.folders || []).map(folder => folder.agents || []).find(agent => agent.agentId == this.agentId) || {};
      }
    })
  }
}
