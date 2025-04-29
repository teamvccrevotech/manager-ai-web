import {Injectable} from '@angular/core';
import {ACCESS_TOKEN, LANGUAGE, LANGUAGE_EN, REFRESH_TOKEN} from '../utils/const-util';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  fakeUser = {
    fullName: 'Trần Hữu Đạt',
    workspaces: [
      {
        workspaceId: 1,
        workspaceName: "Fake workspace 1",
        description: "This is description about workspace 1",
        website: "http://localhost:8080/",
        businessType: "This is businessType 1",
        folders: [
          {
            folderId: 1,
            folderName: "Design",
            agents: [
              {
                name: "agent name 1",
                role: "agent role 1",
                description: "agent description 1",
                agentId:1
              },
              {
                name: "agent name 2",
                role: "agent role 2",
                description: "agent description 2",
                agentId:2
              }
            ]
          },
          {
            folderId: 2,
            folderName: "Sale",
          },{
            folderId: 3,
            folderName: "Marketing",
            agents: [
              {
                name: "agent name 3",
                role: "agent role 3",
                description: "agent description 3",
                agentId:3
              },
              {
                name: "agent name 4",
                role: "agent role 4",
                description: "agent description 4",
                agentId:4
              },
              {
                name: "agent name 5",
                role: "agent role 5",
                description: "agent description 5",
                agentId:5
              }
            ]
          },{
            folderId: 4,
            folderName: "IT",
            agents: [
              {
                name: "agent name 3",
                role: "agent role 3",
                description: "agent description 3",
                agentId:6
              },
              {
                name: "agent name 4",
                role: "agent role 4",
                description: "agent description 4",
                agentId:7
              },
              {
                name: "agent name 5",
                role: "agent role 5",
                description: "agent description 5",
                agentId:8
              },
              {
                name: "agent name 6",
                role: "agent role 6",
                description: "agent description 6",
                agentId:9
              },
              {
                name: "agent name 3",
                role: "agent role 3",
                description: "agent description 3",
                agentId:10
              },
              {
                name: "agent name 4",
                role: "agent role 4",
                description: "agent description 4",
                agentId:11
              },
            ]
          },
        ]
      }
    ]
  }
  private currentUserSubject = new BehaviorSubject<any>(this.fakeUser);
  currentUser = this.currentUserSubject.asObservable();

  constructor() {
  }

  setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
  }

  signOut(): void {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }

  public saveToken(authResponse: any): void {
    localStorage.setItem(ACCESS_TOKEN, authResponse?.accessToken);
    localStorage.setItem(REFRESH_TOKEN, authResponse?.refreshToken);
  }

  public getToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  public setLanguage(language: string) {
    localStorage.removeItem(LANGUAGE);
    if (language) {
      localStorage.setItem(LANGUAGE, language);
    } else {
      localStorage.setItem(LANGUAGE, LANGUAGE_EN);
    }
  }

  public getLanguage() {
    let lang = localStorage.getItem(LANGUAGE);
    if (lang) {
      return lang;
    } else {
      localStorage.setItem(LANGUAGE, LANGUAGE_EN);
      return LANGUAGE_EN;
    }
  }
}
