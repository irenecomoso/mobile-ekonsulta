/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable arrow-body-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { UserService } from './../services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from './../services/chat.service';
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


  constructor(
    public chats: ChatService,
    public afu: AuthService,
    public userservice: UserService

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
}
