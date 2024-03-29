/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable no-var */
import { UserService } from './../services/user.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MenuController } from '@ionic/angular';
export class PatientInfo
{
  email: string;
  fullname: string;
  dob: string;
  password: string;
  contact_number: string;
  health_insurance: string;
  member_id: string;
  address: string;
}

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.page.html',
  styleUrls: ['./patient-profile.page.scss'],
})
export class PatientProfilePage implements OnInit {
  model = new PatientInfo();
  userID: string;
  imgUrl: any;
  info: any = [];
  insList: any = [];
  file: any;
  health_insurance: string;
  member_ID: string;
  insurance_info: any = [];

  constructor(public userservice: UserService,public afu: AuthService,private menu: MenuController) { }
  ngOnInit() {
    this.patientMenu();
    this.userID = this.afu.get_UID();
    this.userservice.get_avatar(this.userID).then(e =>{
      if(e.data().image)
        this.imgUrl = e.data().image;
    }).catch(error => {
      console.log(error.message);
    })
    var data;
    this.userservice.get_UserInfo(this.userID).then(e=>{
      this.health_insurance = e.data().health_insurance;
      this.member_ID = e.data().member_ID;

      this.userservice.get_HealthInsurance_Info(e.data().health_insurance).then(item=>{
        data = e.data();
        data.insurance_name = item.data().name;
        this.info = data;
      }).then(()=>{
        this.userservice.get_patient_insuranceInfo(this.userID,this.health_insurance)
        .then(res=>{
          res.forEach(a => {
            this.insurance_info = a.data
          });
        })
      })
    })
    this.insurance_list();
  }
  patientMenu() {
    this.menu.enable(true, 'first');
  }
  insurance_list(){
    var data;
    var tempArray= [];
    this.userservice.get_HealthInsurance().then(e=>{
      e.forEach(item => {
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
      });
    })
    this.insList = tempArray;
  }
  delete_account()
  {
    this.afu.delete_user().then(()=>{
      console.log('authentication deleted!');
    });
    this.userservice.delete_user(this.userID);
  }
  logout(){
    this.afu.signout();
  }
}
