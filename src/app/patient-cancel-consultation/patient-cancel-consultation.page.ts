/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable curly */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/quotes */
import { MenuController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-patient-cancel-consultation',
  templateUrl: './patient-cancel-consultation.page.html',
  styleUrls: ['./patient-cancel-consultation.page.scss'],
})
export class PatientCancelConsultationPage implements OnInit {
  userid: any;
  currentDate: string = "";

  docList: any = [];
  doneList: any = [];

  error_message: string = "";
  info: any = [];

  constructor(
    public userservice: UserService,
    public afu: AuthService,
    public router: Router,
    private menu: MenuController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    //getting the current Date
    this.currentDate = formatDate(new Date(),'MM/dd/yyyy hh:mm','en');
  }
  cancel(){
    console.log(this.info);
    let record = {};
    record['patient_id'] = this.userid;
    record['upcoming_id'] = this.info.upcoming_id;
    record['transaction_id'] = this.info.transaction_id;
    this.userservice.cancel_consultation(record)
    .then(()=>{
      //send notification for cancellation
      let record = {};
      record['title'] = "Cancelled Consultaion";
      record['description'] = "A Patient want to cancel its consultation";
      record['createdAt'] = formatDate(new Date(),'short','en');
      record['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
      this.userservice.get_admin().then(e=>{
        e.forEach(item=>{
          //this.notif.send_admin(item.id,record);
        })
      })
      record['description'] = "A Patient cancelled its consultation";
      //this.notif.send_doctor(this.info.uid,record);
      document.getElementById('closeModal').click();
      this.info = [];
      this.ngOnInit();
    });
  }

}
