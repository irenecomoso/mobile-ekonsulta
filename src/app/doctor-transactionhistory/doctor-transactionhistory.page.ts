/* eslint-disable @typescript-eslint/semi */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-transactionhistory',
  templateUrl: './doctor-transactionhistory.page.html',
  styleUrls: ['./doctor-transactionhistory.page.scss'],
})
export class DoctorTransactionhistoryPage implements OnInit {
  userId: string = "";
  tranList: any = [];

  constructor(
    public userservice: UserService,
    public afu: AuthService
  ) { }

  ngOnInit(): void {
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
        this.userservice.get_UserInfo(item.data().patient_id)
        .then(as=>{
          data = item.data();
          data.uid = item.id;
          data.patient_name = as.data().fullname;
          data.total_dec = (item.data().Amount*(item.data().deduction/100)).toFixed(2);
          //console.log(data);
          tempArray.push(data);
        })
      })
    })
    this.tranList = tempArray;
    console.log(this.tranList);
  }

}
