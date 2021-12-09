/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { formatDate } from '@angular/common';
export class PatientInfo
{
  email: string;
  fullname: string;
  dob: string;
  password: string;
  contact_number: string;
  address: string;
  health_insurance: 'default';
  member_ID: string;
}
@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.page.html',
  styleUrls: ['./patient-register.page.scss'],
})
export class PatientRegisterPage implements OnInit {
  form: FormGroup;
  model = new PatientInfo();
  error: { name: string;message: string } = { name: '', message: ''};
  confirmPass: string;
  pass_message: string ;
  insList: any = [];
  constructor(public afu: AuthService,public router: Router,public userservice: UserService) { }

  ngOnInit(): void {
    var data;
    var tempArray = [];
    this.userservice.get_HealthInsurance().then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
      })
    })
    this.insList = tempArray;
    console.log(this.insList);
  }
  register_Patient(frm){
    //console.log(frm);
    if(frm.password == this.confirmPass)
    {
      console.log(frm);
      this.afu.registerWithEmail_patient(frm)
        .then(() => {
          //Notification send to Health Insurance
          let record = {};
          record['createdAt'] = formatDate(new Date(),'short','en');
          record['title'] = "Patient Verification"
          record['description'] = "Go to Verification and Verify the Patient whether He/She is in your service!";
          //this.notif.send_insurance(frm.health_insurance,record);
          //End of notification
          this.router.navigate(['/login'])
        }).catch(_error => {
          this.error = _error
          this.router.navigate(['/patient-registration'])
        })
    }
    else
    {
      this.pass_message = "Passwords do not match!"
    }
  }
}
