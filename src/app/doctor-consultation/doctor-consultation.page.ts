/* eslint-disable eqeqeq */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { ChatService } from './../services/chat.service';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-doctor-consultation',
  templateUrl: './doctor-consultation.page.html',
  styleUrls: ['./doctor-consultation.page.scss'],
})
export class DoctorConsultationPage implements OnInit {
  selectTabs= 'upcoming';

  userList: any = [];
  userList2$: Observable<any>;
  userId : string = "";

  constructor(public userservice : UserService,public router: Router,public afu : AuthService,public chats : ChatService
  ) { }
   /** set to false so that when loading the patient's page, content of that function is not displayed */
   upcoming = false;
   done = false;

  upcomingFunction(){
    this.upcoming = true;
    this.done = false;
  }
  doneFunction(){
   this.upcoming = false;
   this.done = true;
  }
  ngOnInit(): void {

    this.userId = this.afu.get_UID();
    localStorage.removeItem('data');
    this.get_userInfo();
  }
  chat(info)
  {
    this.router.navigate(['/doctor-patient-chat']);
    if(localStorage.getItem('data')==null)
    {
      localStorage.setItem('data',JSON.stringify(info))
    }
  }
  get_userInfo()
  {
    var data;
    var tempArray = [];
    this.userservice.get_doctor_upcoming(this.userId).onSnapshot(snapshot=>{
      let changes = snapshot.docChanges();
      changes.forEach(e=>{
        this.userservice.get_patientInfo(e.doc.data().patient_id).then(a=>{
          this.userservice.get_avatar(e.doc.data().patient_id).then(im=>{
            data = a.data();
            data.uid = a.id;
            data.upcoming_status = e.doc.data().status;
            data.schedule = e.doc.data().schedule;
            data.image = im.data().image;
            //this.userList2$ = data;
            if(e.type == 'added')
             tempArray.push(data);
            else if(e.type == 'modified')
            {
              var index = tempArray.findIndex( x => x.fullname === data.fullname);
              tempArray.splice(index,1,data);
            }
          })
        })
      })
    })
    this.userList = tempArray;
  }

}
