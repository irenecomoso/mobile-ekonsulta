/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MenuController } from '@ionic/angular';
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
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.page.html',
  styleUrls: ['./doctor-profile.page.scss'],
})
export class DoctorProfilePage implements OnInit {
  model = new DoctorInfo();

  userId: string;
  info: any = [];
  spInfo: any = [];
  spList: any = [];
  imgUrl: any;
  file: any;

  constructor(public userservice: UserService,public afu: AuthService,private menu: MenuController) { }

  ngOnInit(): void {
    this.doctorMenu();
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

  doctorMenu() {
    this.menu.enable(true, 'second');
  }
}
