/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-transactionhistory',
  templateUrl: './patient-transactionhistory.page.html',
  styleUrls: ['./patient-transactionhistory.page.scss'],
})
export class PatientTransactionhistoryPage implements OnInit {
  userInfo: any = [];
  userId: string = "";
  transList: any = [];

  constructor(
    public userservice: UserService,
    public afu: AuthService
  ) { }

  ngOnInit(): void {
    this.userId = this.afu.get_UID();
    this.get_transaction();
    this.get_userInfo();
  }

  get_transaction()
  {
    var data;
    var tempArray = [];
    this.userservice.get_patient_transaction(this.userId).then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
      })
    })
    this.transList = tempArray;
    console.log(this.transList);
  }
  get_userInfo()
  {
    this.userservice.get_UserInfo(this.userId).then(e=>{
      this.userInfo = e.data();
      console.log(this.userInfo);
    })
  }
}
