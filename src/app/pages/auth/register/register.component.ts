import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  passwordVisible: boolean = false
  formGroup : FormGroup;
  registerSuccess : boolean = false
  constructor(
    private authService : AuthService,
    private translate : TranslateService,
    private router: Router,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.formGroup = new FormGroup({
      username: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required,Validators.email]),
      password: new FormControl("",[Validators.required]),
      confirmPassword: new FormControl("",[Validators.required]),
      fullName: new FormControl("",[Validators.required]),
    })
  }
  submitForm(){
    if(this.formGroup.invalid){
      Object.values(this.formGroup.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    // this.authService.register(this.formGroup.value).subscribe(data => {
    //   if(data.code==400){
    //     if (data.body) {
    //       Object.keys(data.body).forEach(key => {
    //         let field = key.replace("]","");
    //         field = field.replace("[",".");
    //         this.formGroup.get(field)?.setErrors({'serverError': true, 'serverErrorMess': data.body[key]});
    //       });
    //       return;
    //     }
    //   }else{
    //     this.redirectLogin(data.message)
    //   }
    // })
  }
  redirectLogin(content: string){
    this.modal.info({
      nzOnOk: ()=>{
        this.router.navigate(["/login"]);
      },
      nzTitle: this.translate.instant("common.notification"),
      nzContent: content
    })

  }
}
