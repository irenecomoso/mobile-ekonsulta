import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/semi */
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from './../services/user.service';
import { DoctorInfo } from './../doctor-profile/doctor-profile.page';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-edit-profile',
  templateUrl: './doctor-edit-profile.page.html',
  styleUrls: ['./doctor-edit-profile.page.scss'],
})
export class DoctorEditProfilePage implements OnInit {
  model = new DoctorInfo();
  info: any = [];
  userId: string;
  spInfo: any = [];
  spList: any = [];
  imgUrl: any;
  file: any;
  form: FormGroup;
  constructor(public userservice: UserService, public afu: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.userId = this.afu.get_UID();
    this.userservice.get_patientInfo(this.userId).then(e=>{
     // console.log(e.data());
      this.info = e.data();
    }).then(()=>{
      this.userservice.get_specializationInfo(this.info.specialization).then(e=>{
        this.spInfo = e.data();
      })
    })

    this.userservice.get_avatar(this.userId).then(e=>{
      this.imgUrl = e.data().image;
    })

    var data;
    var tempArray = [];
    this.userservice.get_Speciaalization().then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
      })
    })
    this.spList = tempArray;
    this.model.fullname = this.info.fullname;
    this.model.dob = this.info.dob;
    this.model.email = this.info.email;
    this.model.password = this.info.password;
    this.model.contact_number = this.info.contact_number;
    this.model.address = this.info.address;
    this.model.license_number = this.info.license_number;
    this.model.specialization = this.info.specialization;
  }
  update(frm){
    this.userservice.update_user(this.userId,frm).then(()=>{
      this.ngOnInit();
      alert('Updated successfully!');
      //this.router.navigate(['/patient-profile'])
    })
  }

}
