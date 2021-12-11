/* eslint-disable eqeqeq */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-set-consultation-fee',
  templateUrl: './doctor-set-consultation-fee.page.html',
  styleUrls: ['./doctor-set-consultation-fee.page.scss'],
})
export class DoctorSetConsultationFeePage implements OnInit {

  userId: string;
  info: any = [];
  spInfo : any = [];
  imgUrl : any;
  profile_changed: boolean = false;

  pending_message: boolean = false;
  fee: number = 0;
  timeLeft: number = 10;
  interval;

  constructor(public userservice: UserService,public afu: AuthService,
    private menu: MenuController, private alertCtrl: AlertController,
    public router: Router) { }

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
    //this.spList = tempArray;
    this.update_fee();
    this.get_doctorInfo();
  }
  get_doctorInfo()
  {
    this.userId = this.afu.get_UID();
    this.userservice.get_patientInfo(this.userId).then(e=>{
      console.log(e.data());
     this.fee = e.data().consultation_fee;
     console.log(this.fee);
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
  update_fee()
  {
    let record = {}
    record["consultation_fee"] = this.fee;
    this.userservice.update_doctor_fee(this.userId,record).then(()=>{
      console.log('Updated!');
    })
    //this.router.navigate(['/patient-profile']);
  }

}
