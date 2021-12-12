/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/semi */
import { NotificationService } from './../services/notification.service';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-doctor-medical-certificate',
  templateUrl: './doctor-medical-certificate.page.html',
  styleUrls: ['./doctor-medical-certificate.page.scss'],
})
export class DoctorMedicalCertificatePage implements OnInit {
  @ViewChild('file') files: ElementRef;
  @ViewChild('file2') files2: ElementRef;

  userid: string = ""; // Doctor ID
  patientInfo: any = []; //Patient Information includng its ID
  chat_id: string = "";

  content: string = "";
  chat$: Observable<any>;

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
  uploadMedical()
  {
    if(this.filename != "" && this.file1 != "")
    {
      console.log(this.file1);
      this.userservice.send_medicalRecord(this.patientInfo.uid,this.userid,this.filename+".pdf",this.file1)
      .catch(error=>{
        console.log(error)
      }).then(()=>{
        console.log("Stored successfully!");
        this.success_message = "File sent successfully!";

        let record2 ={};
        record2['title'] = "Medical Certificate"
        record2['description'] = "A doctor sent a medical Certificate. Check your Records now!";
        record2['createdAt'] = formatDate(new Date(),'short','en');
        record2['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
        //this.notif.send_patient(this.patientInfo.uid,record2);
        //this.router.navigate[('/doctor-chat-info')];
        setTimeout(() => {
          this.success_message = "";
        }, 5000);
      })
    }
    else{
      console.log('Empty Fields');
      this.error_message = "Empty Fields!";
      setTimeout(() => {
        this.error_message = "";
      }, 5000);
    }
  }
  choosefile2(e)
  {
    this.file1 = e.target.files[0];
    console.log(this.file1);
  }
}
