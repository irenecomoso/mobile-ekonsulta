/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
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
  constructor(public afu: AuthService,public router: Router) { }

  ngOnInit(): void {
  }
  register_Patient(frm){
    if(frm.password === this.confirmPass){
      console.log(frm);
      this.clearErrorMessage();
      this.afu.registerWithEmail_patient(frm).then(() => {
        this.router.navigate(['/login'])
      }).catch((_error) => {
        this.error = _error
        this.router.navigate(['/patient-register'])
      });
  }
  }
  clearErrorMessage()
  {
    this.error = {name : '', message : ''};
  }

}
