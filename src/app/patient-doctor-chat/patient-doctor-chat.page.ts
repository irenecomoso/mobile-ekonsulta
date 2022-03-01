import { Router } from '@angular/router';
/* eslint-disable prefer-const */
import { SharedDataService } from './../services/shared-data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './../services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from './../services/chat.service';
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable arrow-body-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-patient-doctor-chat',
  templateUrl: './patient-doctor-chat.page.html',
  styleUrls: ['./patient-doctor-chat.page.scss'],
})
export class PatientDoctorChatPage implements OnInit {
  docInfo: any = [];

  userid: string = "";
  chat_id: string = "";

  content: string = "";
  chat$: Observable<any>;

  imgUrl: any;
  dataInput: string = "";

  constructor(
    public chats: ChatService,
    public afu: AuthService,
    public userservice: UserService,
    public db: AngularFirestore,
    public sds: SharedDataService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.userid = this.afu.get_UID();
    console.log(this.userid);
    this.userservice.get_avatar(this.userid).then(e=>{
      this.imgUrl = e.data().image;
    })
    this.docInfo = JSON.parse(localStorage.getItem('data'));
    this.chats.check_chat(this.docInfo.uid,this.userid).then(e=>{
      e.forEach(item=>{
        this.chat_id = item.id;
      })
    }).then(()=>{
      this.chat_source();
    })
    this.finish_consultation();
    this.videoCall_listener();
  }
  videoCall_listener()
  {
    this.db.firestore.collection('calls').where('offer.doctor_id','==',this.docInfo.uid).
    where('offer.patient_id','==',this.userid).onSnapshot(snapshot=>{
      let changes = snapshot.docChanges();
      changes.forEach(e=>{
        if(e.type == 'added')
        {
          console.log('exist!');
          this.video_call();
        }
      })
    })
  }

  answerCall()
  {
    console.log("test");
    localStorage.setItem('callInput',this.dataInput);
    this.video_call();
    document.getElementById("closeModal").click();
  }

  finish_consultation()
  {
    this.userservice.removed_upcoming_trigger(this.userid).onSnapshot(snapshot=>{
      let changes = snapshot.docChanges();
      changes.forEach(e=>{
        if(e.type == 'removed')
        {
          this.router.navigate(['patient-consultation']);
        }
      })
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
  send_message()
  {
    if(this.content != "")
    {
      this.chats.send_message(this.chat_id,this.content,this.userid).then(()=>{
        this.content="";
        console.log("message sent!");
      })
    }
    else
    {
      console.log("Empty!");
    }
  }
  video_call()
  {
    window.open('/patient-video-call','location=yes,height=570,width=2000,scrollbars=yes,status=yes');
  }
}
