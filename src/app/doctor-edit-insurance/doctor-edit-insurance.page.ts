/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-doctor-edit-insurance',
  templateUrl: './doctor-edit-insurance.page.html',
  styleUrls: ['./doctor-edit-insurance.page.scss'],
})
export class DoctorEditInsurancePage implements OnInit {
  userId: string;
  info: any = [];
  spInfo: any = [];
  spList: any = [];
  imgUrl: any;
  file: any;
  insurance_af: any = [];
  request_status: string = "";
  insuranceList: any = [];
  insurance_id: string = "";
  request_sent: boolean = false;

  profile_changed: boolean = false;

  pending_message: boolean = false;
  fee: number = 0;
  timeLeft: number = 10;
  interval;

  constructor(public userservice: UserService,public afu: AuthService,
     private alertCtrl: AlertController, public router: Router) { }

  ngOnInit(): void {
    //this.doctorMenu();
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
  insurance_request()
  {
    let record = {};
    record['doctor_id'] = this.userId;
    record['insurance_id'] = this.insurance_id;
    record['createdAt'] = formatDate(new Date(),'MM/dd/yyyy','en');
    record['updatedAt'] = formatDate(new Date(),'MM/dd/yyyy','en');
    record['status'] = "pending";
    console.log(this.insurance_id);

    if(this.insurance_id != "")
    this.userservice.check_affiliation(this.userId,this.insurance_id)
    .then(e=>{
      if(e.empty)
      {
        this.userservice.insurance_affiliation(record)
        .then(()=>{
          console.log('request sent!');
          this.request_sent = true;
          setTimeout(() => {
            this.request_sent = false;
          }, 5000);

          //notification sent to insurance
          let record = {};
          record['title'] = "Doctor Affiliation Verification";
          record['description']= "A doctor sent a verification, check your Doctor List now!";
          record['createdAt'] = formatDate(new Date(),'short', 'en');
          record['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
          //this.notif.send_insurance(this.insurance_id,record);
        })
      }
      else
      {
        console.log('exist!');
        e.forEach(item=>{
          if(item.data().status != 'pending')
          {
            console.log('true');
            this.request_status = "Already Exist!";
            setTimeout(() => {
              this.request_status = "";
            }, 5000);
          }
          else
          {
            console.log('Pending!');
            this.request_status = "Request still pending!";
            setTimeout(() => {
              this.request_status = "";
            }, 5000);
          }
        })
      }
    })
    else
    {
      this.request_status = "Choose Insurance!";
      setTimeout(() => {
        this.request_status = "";
      }, 5000);
    }
  }

}
