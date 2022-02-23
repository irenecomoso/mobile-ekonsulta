/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable eqeqeq */
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  insurance_af: any = [];

  profile_changed: boolean = false;

  pending_message: boolean = false;
  fee: number = 0;
  timeLeft: number = 10;
  interval;

  constructor(public userservice: UserService,public afu: AuthService,
    private menu: MenuController, private alertCtrl: AlertController,
    public router: Router) { }

  ngOnInit(): void {
    this.doctorMenu();
    this.get_specialization();
    this.get_doctorInfo();
  }
  get_doctorInfo()
  {
    this.userId = this.afu.get_UID();
    this.userservice.get_patientInfo(this.userId).then(e=>{
      console.log(e.data());
     this.fee = e.data().consultation_fee;
      this.info = e.data();
      this.check_verification(this.info.isVerified);
    }).then(()=>{
      this.userservice.get_specializationInfo(this.info.specialization).then(e=>{
        this.spInfo = e.data();
      })
    })

    this.userservice.get_avatar(this.userId).then(e=>{
      this.imgUrl = e.data().image;
    })

  }
  check_verification(verify)
  {
    if(verify == "pending")
    {
      console.log('pending!');
      this.pending_message = true;
      setTimeout(() => {
        this.pending_message = false;
      }, 10000);
      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.interval);
          this.timeLeft = 10;
        }
      },1000)
    }
  }
  get_specialization()
  {
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
