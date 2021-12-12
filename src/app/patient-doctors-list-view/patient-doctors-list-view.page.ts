/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { ElementRef } from '@angular/core';
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
import { Router } from '@angular/router';
import { ChatService } from './../services/chat.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from './../services/user.service';
import { DoCheck,Component, OnInit, ViewChild} from '@angular/core';
// DoCheck,Component, ElementRef, OnInit, ViewChild, KeyValueDiffers
import { formatDate } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-patient-doctors-list-view',
  templateUrl: './patient-doctors-list-view.page.html',
  styleUrls: ['./patient-doctors-list-view.page.scss'],
})
export class PatientDoctorsListViewPage implements OnInit {
  @ViewChild('date') dates: ElementRef;
  docInfo: any = [];
  userid: any;

  scheduleList: any = [];
  timeList: any = [];

  schedule: string = "";
  time: string = "";
  minDate = undefined;
  day_schedule: string = "";

  error_schedule = "";
  date: any = [];
  constructor(
    public userservice: UserService,
    public afu: AuthService,
    public chats: ChatService,
    public router: Router,
  ) {
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
   };
   }
   getdate(date)
  {
    console.log(date);
    // if(this.model != this.date && this.model)
    // {
      // this.time="";
      // console.log(this.model);
      // console.log('Changed2!');
      // this.date = this.model;

      // this.day_schedule = formatDate(new Date(),this.model.month+'/' + this.model.day+'/'+this.model.year,'en');

      // const Day = new Date(this.model.month+'/' + this.model.day+'/'+this.model.year);
      /*var priority = date.day();
      console.log(this.date);

      this.userservice.get_schedule(this.docInfo.uid).then(e=>{
        e.forEach(item=>{
          if(item.data().priority == priority)
          {
            this.get_time(item.id);
            this.schedule = item.id;
            console.log(priority)
          }
        })
      })*/
      var consdate = moment(date);
      const dateYear = consdate.year();
      const dateMonth = consdate.month()+1;
      const dateDay = consdate.date();
      this.day_schedule = formatDate(new Date(),dateMonth+'/' + dateDay+'/'+dateYear,'en');
      const priority = consdate.day();
      this.userservice.get_schedule(this.docInfo.uid).then(e=>{
        e.forEach(item=>{
          if(item.data().priority == priority)
          {
            this.get_time(item.id);
            this.schedule = item.id;
            console.log(priority)
          }
        })
      })
  }

  ngOnInit(): void {

    localStorage.removeItem('schedule');

    this.userid = this.afu.get_UID();
    this.docInfo = JSON.parse(localStorage.getItem('data'));
    console.log(this.docInfo);

    //this.get_schedule();
  }

  get_schedule()
  {
    var data;
    var tempArray= [];
    this.userservice.get_schedule(this.docInfo.uid).then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
      })
    })
    this.scheduleList = tempArray;
  }
  get_time(sched_id)
  {
    var data;
    var tempArray = [];
    this.userservice.get_schedule_time(sched_id).then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
      })
    })
    this.timeList = tempArray;
    console.log(this.timeList);
  }

  /* if(res.size >= item.data().limit)
          {
            data = item.data();
            data.uid = item.id;
            data.status = "full"
            tempArray.push(data);
          }
          else
          {
            data = item.data();
            data.uid = item.id;
            data.status = "notFull"
            tempArray.push(data);
          }*/
  submit(info)
  {
    if(this.time != "" && this.schedule != "")
    {
      this.userservice.reservationChecker(this.schedule,info.time,this.day_schedule).then(e=>{
        this.userservice.get_timeInfo(this.schedule,info.time).then(res=>{
          console.log(e.size + ' ' + res.data().limit);
          if(e.size >= res.data().limit)
          {
            this.error_schedule = "Schedule Full!"
            setTimeout(() => {
              this.error_schedule = "";
            }, 5000);
          }
          else
          {
            console.log('You can add!');
            if(localStorage.getItem('schedule')==null)
            {
              let record={};
              record = info;
              record['consultation_schedule'] = this.day_schedule;
              record['schedule'] = this.schedule;
              localStorage.setItem('schedule',JSON.stringify(record));
            }
            this.router.navigate(['patient-payment']);
          }
        })
      })
    }
    else
    {
      this.error_schedule = "Empty Fields!"
      setTimeout(() => {
        this.error_schedule = "";
      }, 5000);
    }
  }

}
