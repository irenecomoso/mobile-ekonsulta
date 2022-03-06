/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/semi */
import { Observable } from 'rxjs';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { NotificationService } from './../services/notification.service';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { ChatService } from './../services/chat.service';
import { AuthService } from './../services/auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-doctor-patient-chat',
  templateUrl: './doctor-patient-chat.page.html',
  styleUrls: ['./doctor-patient-chat.page.scss'],
})
export class DoctorPatientChatPage implements OnInit {
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
    public chats: ChatService,
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
    console.log(this.patientInfo);
    this.chats.check_chat(this.userid,this.patientInfo.uid).then(e=>{
      e.forEach(item=>{
        this.chat_id = item.id;
      })
    }).then(()=>{
      this.chat_source();
    })
  }

  chat_source()
  {
     console.log(this.chat_id);
     this.chat$=this.chats.get(this.chat_id).pipe(
      map(doc => {
        return {
          id: doc.payload.id,
          ...
          Object.assign({}, doc.payload.data() )
        };
      })
    );
  }
  viewImage(e)
  {
    window.open(e);
  }
  send_message()
  {
    if(this.content!="")
    {
      this.chats.send_message(this.chat_id,this.content,this.userid).then(()=>{
        this.content="";
        console.log("message sent!");
      })
    }else
    {
      console.log("Empty!");
    }
  }
  back(){
    window.location.href='/doctor-consultation';
  }
  video_call()
  {
    const audio = new Audio('assets/sounds/video-button.mp3');
    audio.play();
    window.open('/video-call','location=yes,height=570,width=2000,scrollbars=yes,status=yes');
  }
}
