/* eslint-disable @typescript-eslint/semi */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-doctor-transactionhistory',
  templateUrl: './doctor-transactionhistory.page.html',
  styleUrls: ['./doctor-transactionhistory.page.scss'],
})
export class DoctorTransactionhistoryPage implements OnInit {
  userId: string = "";
  tranList: any = [];
  status: string = "";
  month: string = "";
  year: string = "";

  constructor(
    public userservice: UserService,
    public menu: MenuController,
    public afu: AuthService
  ) { }

  ngOnInit(): void {
    this.doctorMenu();
    this.userId = this.afu.get_UID();
    this.get_transaction();
 }

  get_transaction()
  {
    var data;
    var tempArray = [];
    this.userservice.get_transaction_doctor(this.userId)
    .then(e=>{
      e.forEach(item=>{
        data = item.data();
        tempArray.push(data);
      })
    })
    this.tranList = tempArray;
    console.log(this.tranList);
  }

  doctorMenu() {
    this.menu.enable(true, 'second');
  }

}
