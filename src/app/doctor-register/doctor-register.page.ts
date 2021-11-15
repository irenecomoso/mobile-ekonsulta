/* eslint-disable no-var */
import { UserService } from './../services/user.service';
import { FormGroup } from '@angular/forms';
/* eslint-disable @typescript-eslint/semi */
import { Component, OnInit } from '@angular/core';
import { DoctorForm } from '../class/doctor-form';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-doctor-register',
  templateUrl: './doctor-register.page.html',
  styleUrls: ['./doctor-register.page.scss'],
})
export class DoctorRegisterPage implements OnInit {
  spList: any = [];
  form: FormGroup;
  confirmPass: string;
  model = new DoctorForm();
  error: { name: string; message: string } = { name: '', message: ''};
  constructor(public afu: AuthService,public router: Router,public userservice: UserService) { }
  ngOnInit(): void {
    var data;
    var tempArray = [];
    this.userservice.get_Speciaalization().then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid =item.id;
        tempArray.push(data);
      })
    })
    this.spList = tempArray;
    console.log(this.spList)
  }
  registerDoctor(frm){
    console.log(frm);
    this.clearErrorMessage();
    this.afu.registerWithEmail_doctor(frm).then(()=>{
      this.router.navigate(['/login'])
    }).catch(_error=>{
      this.error =_error
      this.router.navigate(['/doctor-register'])
    })
  }
  clearErrorMessage()
  {
    this.error = {name : '', message : ''};
  }

}
