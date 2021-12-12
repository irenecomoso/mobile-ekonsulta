/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable eol-last */
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/semi */
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
export class DoctorInfo
{
  fullname: string;
  email: string;
  password: string;
  dob: string;
  contact_number: string;
  address: string ;
  license_number: string;
  specialization: string;
}

@Component({
  selector: 'app-doctor-edit-profile',
  templateUrl: './doctor-edit-profile.page.html',
  styleUrls: ['./doctor-edit-profile.page.scss'],
})
export class DoctorEditProfilePage implements OnInit {
  model = new DoctorInfo();
  info: any = [];
  userId: string = "";
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
  }
  update(frm){
      this.userservice.update_user(this.userId,frm).then(()=>{
      console.log('Updated successfully!');
      this.ngOnInit();
      window.location.href='/doctor-profile';
    })
  }
  uploadImage()
  {
    this.userservice.upload_avatar(this.file,this.userId);
  }
  choosefile(e)
  {
    this.file = e.target.files[0];
    console.log(this.file);
  }
}
