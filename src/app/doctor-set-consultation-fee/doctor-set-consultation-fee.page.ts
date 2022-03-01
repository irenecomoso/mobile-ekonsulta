/* eslint-disable curly */
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

  fee : number = 0;
  feeDisplay : number = 0;
  deduction: number = 0;
  net_pay: number = 0;

  pending_message: boolean = false;
  timeLeft: number = 10;
  interval;
  success_message = "";

  constructor(
    public userservice: UserService,
    public afu: AuthService,
    private menu: MenuController,
    private alertCtrl: AlertController,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.get_doctorInfo();
  }
  get_doctorInfo()
  {
    this.userId = this.afu.get_UID();
    this.userservice.get_patientInfo(this.userId).then(e=>{
      console.log(e.data());
      this.feeDisplay = e.data().consultation_fee;

      this.deduction = e.data().consultation_fee*(10/100);
      this.net_pay = e.data().consultation_fee-this.deduction;

      this.info = e.data();
      this.check_verification(this.info.isVerified);
    }).then(()=>{
      this.userservice.get_specializationInfo(this.info.specialization).then(e=>{
        if(e.exists)
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
  }

}
