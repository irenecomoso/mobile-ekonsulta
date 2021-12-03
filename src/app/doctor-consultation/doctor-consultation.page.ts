/* eslint-disable max-len */
import { NotificationService } from './../services/notification.service';
/* eslint-disable @typescript-eslint/dot-notation */
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
import { formatDate } from '@angular/common';

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
  doneList : any = [];

  constructor(public userservice : UserService,public router: Router,public afu : AuthService,public chats : ChatService,public notif : NotificationService
  ) { }
   /** set to false so that when loading the patient's page, content of that function is not displayed */
   upcoming = false;
   done = false;

  ngOnInit(): void {

    this.userId = this.afu.get_UID();
    localStorage.removeItem('data');
    this.get_userInfo();
    this.get_userDoneInfo();
  }
  chat(info)
  {
    console.log(info);
    this.userservice.check_upcoming(this.userId,info.uid).then(e=>{
      e.forEach(res=>{
        this.userservice.update_upcoming(res.id).then(()=>{
          this.router.navigate(['/doctor-patient-chat']);

          //notification
          let record = {};
          record['title'] = "Consultation accepted!";
          record['description'] = "Your consultation has been accepted Join Now!";
          record['createdAt'] = formatDate(new Date(),'short','en');
          this.notif.send_patient(info.uid,record)

          if(localStorage.getItem('data')==null)
          {
            localStorage.setItem('data',JSON.stringify(info))
          }
        })
      })
    })
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
            data.upcoming_id = e.doc.id;
            data.schedule = e.doc.data().schedule;
            data.schedtime = e.doc.data().time;
            data.consultation_schedule = e.doc.data().consultation_schedule;
            data.image = im.data().image;
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

  get_userDoneInfo()
  {
    var data;
    var tempArray = [];
    this.userservice.get_consultation(this.userId).then(e=>{
      e.forEach(item=>{
        console.log(item.data());
        this.userservice.get_UserInfo(item.data().patient_id).then(a=>{
          data = a.data();
          data.schedule = item.data().schedule;
          data.consultation_schedule = item.data().consultation_schedule;
          data.schedtime = item.data().time;
          tempArray.push(data);
        })
      })
    })
    this.doneList = tempArray;
    console.log(this.doneList);
  }

}
