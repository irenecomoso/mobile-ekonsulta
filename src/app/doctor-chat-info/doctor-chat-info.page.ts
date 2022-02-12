/* eslint-disable no-trailing-spaces */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { NotificationService } from './../services/notification.service';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-chat-info',
  templateUrl: './doctor-chat-info.page.html',
  styleUrls: ['./doctor-chat-info.page.scss'],
})
export class DoctorChatInfoPage implements OnInit {
  userid: string = ""; // Doctor ID
  patientInfo: any = []; //Patient Information includng its ID
  chat_id: string = "";

  content: string = "";

  imgUrl: any;

  file1: any = "";
  file2: any = "";

  filename: string = "";
  filename2: string = "";

  error_message = "";
  success_message = "";


  medList: any = [];
  labList: any = [];
  presList: any = [];
  show: boolean = false;
  constructor(
    public afu: AuthService,
    public userservice: UserService,
    public router: Router,
    //public notif: NotificationService
  ) { }

  ngOnInit(): void {

    this.userid = this.afu.get_UID();
    this.userservice.get_avatar(this.userid).then(e=>{
      this.imgUrl = e.data().image;
    })
    this.patientInfo = JSON.parse(localStorage.getItem('data'));
  }
  finish_consultation()
  {
    console.log(this.patientInfo);
    let record = {};
    this.userservice.get_upcoming(this.patientInfo.upcoming_id).then(e=>{
      record['createdAt'] = formatDate(new Date(),'MM/dd/yyyy','en');
      record['doctor_id'] = e.data().doctor_id;
      record['patient_id'] = e.data().patient_id;
      record['schedule'] = e.data().schedule;
      record['transaction_id'] = e.data().transaction_id;
      record['consultation_schedule'] = e.data().consultation_schedule;
      record['time'] = e.data().time;
      record['status'] = "done";
    }).then(()=>{
      this.userservice.remove_upcoming(this.patientInfo.upcoming_id).then(()=>{
        console.log('Upcoming removed!')

        let record2= {};
        record2['status'] = "done";
        if(this.patientInfo.paymentType != "insurance")
         this.userservice.update_transaction_admin(this.patientInfo.transaction_id,record2);
        else
        {
          this.userservice.update_transaction_insurance(this.patientInfo.health_insurance,this.patientInfo.transaction_id,record2);
        }
        this.userservice.remove_share(this.userid,this.patientInfo.uid);

      }).then(()=>{
        this.userservice.create_consultation(record).then(()=>{
          console.log('Consultation Record Created!');
          this.router.navigate(['doctor-consultation']);

          let record2 ={};
          record2['title'] = "Consultation Finished"
          record2['description'] = "Congratulations! You have finished your Consultation!";
          record2['createdAt'] = formatDate(new Date(),'short','en');
          record2['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
          //this.notif.send_patient(this.patientInfo.uid,record2);
        })
      })
    });
  }

  cancel_consultation()
  {
    console.log(this.patientInfo);
    if(this.patientInfo.paymentType != 'insurance')
    this.userservice.cancel_consultation_doctor(this.patientInfo)
    .then(()=>{
      console.log('Upcoming Removed!');
      console.log('Cancelled Consultation!');

      this.router.navigate(['doctor-consultation']);

      let record = {};
      record['title'] = "Consultation Cancelled";
      record['description'] = "Your consultation has been cancelled because of your nonappearance.";
      record['createdAt'] = formatDate(new Date(),'short','en');
      record['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
      //this.notif.send_patient(this.patientInfo.uid,record);
    })
    else
    {
      this.userservice.cancel_consultation_insurance(this.patientInfo)
      .then(()=>{
        console.log('Upcoming Removed!');
        console.log('Cancelled Consultation!!');

        this.router.navigate(['doctor-consultation']);

        let record = {};
        record['title'] = "Consultation Cancelled";
        record['description'] = "Your consultation has been cancelled because of your nonappearance.";
        record['createdAt'] = formatDate(new Date(),'short','en');
        record['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
        //this.notif.send_patient(this.patientInfo.uid,record);
      })
    }
  }

}
