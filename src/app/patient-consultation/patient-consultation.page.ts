/* eslint-disable curly */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/quotes */
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from './../services/user.service';
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-consultation',
  templateUrl: './patient-consultation.page.html',
  styleUrls: ['./patient-consultation.page.scss'],
})
export class PatientConsultationPage implements OnInit {
  selectTabs= 'upcoming';
  userid: any;

  docList: any = [];
  doneList: any = [];

  error_message: string = "";

  constructor(
    public userservice: UserService,
    public afu: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {

    localStorage.removeItem('data');

    this.userid = this.afu.get_UID();
    this.get_upcoming();
    this.get_done();
  }

  chat(info)
  {
    if(info.upcoming_status != 'pending')
    {
      this.router.navigate(['/patient-doctor-chat']);
      if(localStorage.getItem('data')==null)
      {
        localStorage.setItem('data',JSON.stringify(info))
      }
    }
    else
    {
      console.log('Please wait for the doctor to accept.');
      this.error_message = "Please wait for the doctor to accept.";
      setTimeout(() => {
        this.error_message="";
      }, 3000);
    }
  }

  get_upcoming()
  {
    var data;
    var tempArray= [];
    this.userservice.get_patient_upcoming(this.userid).onSnapshot(snapshot=>{
      let changes = snapshot.docChanges();
      changes.forEach(e=>{
        this.userservice.get_UserInfo(e.doc.data().doctor_id).then(a=>{
          this.userservice.get_avatar(e.doc.data().doctor_id).then(img=>{
            data = a.data();
            data.upcoming_status = e.doc.data().status;
            data.schedule = e.doc.data().schedule;
            data.schedtime = e.doc.data().time;
            data.image = img.data().image;
            data.uid = a.id;
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
    this.docList = tempArray;
  }
  get_done()
  {
    var data;
    var tempArray = [];
    this.userservice.get_patient_consultation(this.userid).then(e=>{
      e.forEach(item=>{
        this.userservice.get_UserInfo(item.data().doctor_id).then(a=>{
          data = item.data();
          data.fullname = a.data().fullname
          tempArray.push(data);
        })
      })
    })
    this.doneList = tempArray;
  }

}
