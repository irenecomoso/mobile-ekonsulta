/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/semi */
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-edit-insurance',
  templateUrl: './patient-edit-insurance.page.html',
  styleUrls: ['./patient-edit-insurance.page.scss'],
})
export class PatientEditInsurancePage implements OnInit {
  userID: string = "";
  imgUrl: any;
  info: any = [];
  insList: any = [];

  insurance_info: any = [];

  request_error: string = "";
  request_sent: string = "";

  health_insurance: string = "";
  member_ID: string = "";
  error: { name: string;message: string } = { name: '', message: ''};
  constructor(public afu: AuthService, public userservice: UserService, public router: Router) { }

  ngOnInit(): void {
    this.userID = this.afu.get_UID();

    this.userservice.get_avatar(this.userID).then(e =>{
      if(e.data().image)
        this.imgUrl = e.data().image;
    }).catch(error => {
      console.log(error.message);
    })

    var data;
    this.userservice.get_UserInfo(this.userID).then(e => {

      this.health_insurance = e.data().health_insurance;
      this.member_ID = e.data().member_ID;

      this.userservice.get_HealthInsurance_Info(e.data().health_insurance).then(item=>{
        data = e.data();
        data.insurance_name=item.data().name;
        this.info = data;
      }).then(()=>{
        this.userservice.get_patient_insuranceInfo(this.userID,this.info.health_insurance)
        .then(res=>{
          res.forEach(a=>{
            this.insurance_info = a.data();
          })
        })
      })
    })
    this.insurance_list();
  }
  insurance_list()
  {
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
  update_insurance()
  {
    let record = {}
    if(this.info.isVerified === 'verified' && this.info.health_insurance === this.health_insurance)
    {
      record['isVerified'] = 'verified';
    }
    else
    {
      record['isVerified'] = 'pending';
    }
    record['health_insurance'] = this.health_insurance;
    record['member_ID'] = this.member_ID;
    this.userservice.update_patient_insurance(this.userID,record).then(()=>{
      console.log('Sent!');
      this.ngOnInit();
    })
  }
  /*update(frm)
  {
      //this.userservice.update_user(this.userID,frm).then(()=>{
      console.log(frm);
      console.log('patient Updated!');
      this.ngOnInit();
      this.router.navigate(['/patient-profile']);
  }*/

}
