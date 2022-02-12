/* eslint-disable max-len */
/* eslint-disable no-var */
import { MenuController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-doctor-user-analytics',
  templateUrl: './doctor-user-analytics.page.html',
  styleUrls: ['./doctor-user-analytics.page.scss'],
})
export class DoctorUserAnalyticsPage implements OnInit {
  selectTabs= 'today';
  userId: string = "";

  total: number = 0;
  today: number = 0;
  currentEarning: number = 0;
  totalEarning: number = 0;

  constructor(
    public userservice: UserService,
    public afu: AuthService,
    private menu: MenuController
  ) { }

  ngOnInit(): void {
    this.doctorMenu();
    this.userId = this.afu.get_UID();
    this.get_consultations();
    this.get_today();
    this.get_earnings();
  }
  doctorMenu() {
    this.menu.enable(true, 'second');
  }

  get_consultations()
  {
    this.userservice.get_consultation(this.userId).then(e=>{
      this.total = e.size;
    })
  }
  get_today()
  {
    this.userservice.get_today_consultation(this.userId).then(e=>{
      this.today = e.size;
    })
  }
  get_earnings(){
    this.userservice.get_doctorEarning(this.userId)
    .then(e=>{
      e.forEach(item=>{
        var date = (new Date(item.data().createdAt).getMonth()+1)+'/'+new Date(item.data().createdAt).getDate()+'/'+new Date(item.data().createdAt).getFullYear();
        if(date.match(formatDate(new Date(),'M/d/yyyy','en')))
        {
          console.log('true');
          this.currentEarning+=parseFloat(item.data().net_income);
        }
        this.totalEarning += item.data().net_income;
      })
    })
  }
}
