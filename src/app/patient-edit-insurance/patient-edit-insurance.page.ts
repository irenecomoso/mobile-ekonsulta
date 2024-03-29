/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/semi */
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-patient-edit-insurance',
  templateUrl: './patient-edit-insurance.page.html',
  styleUrls: ['./patient-edit-insurance.page.scss'],
})
export class PatientEditInsurancePage implements OnInit {
  userID: string = "";
  imgUrl: any;
  info: any = [];
  insList: any = [];
  file: any;
  file2: any;
  filename: string = "";

  insurance_info: any = [];

  request_error: string="";
  request_sent: string = "";

  verified_message: string = "";
  verification_sent: string = "";

  labList: any = [];
  lab_id: string = "";
  lab_id2: string = ""; //for request LOA 
  empty_field: string = "";
  lab_message: string = "";


  health_insurance: string = "";
  member_ID: string = "";
  error: { name: string;message: string } = { name: '', message: ''};
  constructor(public afu: AuthService, public userservice: UserService, public router: Router) { }

  ngOnInit(): void {
    this.userID = this.afu.get_UID();

    this.userservice.get_avatar(this.userID).then(e =>{
      if(e.data().image)
        this.imgUrl = e.data().image;
    }).catch(error => {
      console.log(error.message);
    })

    var data;
    this.userservice.get_UserInfo(this.userID).then(e => {

      this.health_insurance = e.data().health_insurance;
      this.member_ID = e.data().member_ID;

      this.userservice.get_HealthInsurance_Info(e.data().health_insurance).then(item=>{
        data = e.data();
        data.insurance_name=item.data().name;
        this.info = data;
      }).then(()=>{
        this.userservice.get_patient_insuranceInfo(this.userID,this.info.health_insurance)
        .then(res=>{
          res.forEach(a=>{
            this.insurance_info = a.data();
          })
        })
      })
    })
    this.insurance_list();
    this.get_lab();
  }
  choosefile(e)
  {
    this.file = e.target.files[0];
    console.log(this.file);
  }
  choosefile2(e)
  {
    this.file2 = e.target.files[0];
    console.log(this.file2);
  }
  insurance_list()
  {
    var data;
    var tempArray = [];
    this.userservice.get_HealthInsurance().then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
      })
    })
    this.insList = tempArray;
    console.log(this.insList);
  }
  update_insurance()
  {
    if(this.health_insurance != "none" && this.health_insurance != "" && this.file2 != undefined && this.member_ID != "" && this.member_ID != "none")
      if(this.info.isVerified == 'verified' && this.info.health_insurance == this.health_insurance)
      {
        console.log('Already Verified!');
        this.verified_message = "Already Verified!";
        setTimeout(() => {
          this.verified_message = "";
        }, 5000);
      }
      else if(this.info.isVerified == "pending" && this.info.health_insurance == "none" || this.info.health_insurance != this.health_insurance)
      {
        let record = {};
        record['isVerified'] = 'pending';
        record['health_insurance'] = this.health_insurance;
        record['member_ID'] = this.member_ID;
        this.userservice.update_patient_insurance(this.userID,record,this.file2).then(()=>{
          this.verification_sent = "Verification Sent!";

          let record2 = {};
          record2['createdAt'] = formatDate(new Date(),'short','en');
          record2['title'] = "Patient Verification";
          record2['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
          record2['description'] = "Go to Verification and verify the Patient whether He/She is in your service";
          //this.notif.send_insurance(this.health_insurance,record2)

          setTimeout(() => {
            this.verification_sent = "";
          }, 5000);
          this.ngOnInit();
        })
      }
      else
      {
        console.log("test");
      }
    else
    {
      console.log('Empty Fields');
    }
  }
  send_labLOA()
  {
    if(this.file && this.lab_id)
    {
      let record = {};
      record['file'] = this.file;
      record['filename'] = this.file.name;
      this.userservice.send_labLOA(this.lab_id,this.userID,record)
      .then(()=>{
        console.log('added!');

        let record2 = {};
        record2['createdAt'] = formatDate(new Date(),'short','en');
        record2['title'] = "LOA";
        record2['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
        record2['description'] = "A patient sent an LOA. Check your LOA list";
        //this.notif.send_lab(this.lab_id,record2)

        this.lab_message = "File sent!";
        this.file = "";
        setTimeout(() => {
          this.lab_message = "";
        }, 5000);
      })
    }
    else
    {
      console.log('Empty fields!');
      this.empty_field = "Empty Fields!";
      setTimeout(() => {
        this.empty_field = "";
      }, 3000);
    }
  }
  get_lab()
  {
    var data;
    var tempArray = [];
    this.userservice.get_labPartner().forEach(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid = item.id;
        tempArray.push(data);
      })
    })
    this.labList = tempArray;
    console.log(this.labList);
  }
  request_LOA()
  {
    console.log(this.info.isVerified)
    if(this.info.isVerified != 'pending' && this.info.isVerified != 'declined')
    {
      //Check if the user already sent a request within the Day
      this.userservice.check_LOA(this.info.health_insurance,this.userID,formatDate(new Date(),'MM/dd/yyyy','en'))
      .then(e=>{
        if(e.empty)
        {
          if(this.lab_id2 != "")
          {
            this.userservice.request_LOA(this.info.health_insurance,this.userID,this.lab_id2)
            .then(()=>{
              this.request_sent = "Request Sent!";
              setTimeout(() => {
                this.request_sent = "";
                this.lab_id2 = "";
              }, 3000);
              let record = {};
              record['createdAt'] = formatDate(new Date(),'short','en');
              record['title'] = "LOA request";
              record['description'] = "A patient requested for LOA";
              //this.notif.send_insurance(this.info.health_insurance,record)

            })
          }
          else
          {
            this.request_error = "Please choose a laboratory!";
            setTimeout(() => {
              this.request_error = "";
            }, 3000);
          }
        }
        else
        {
          this.request_error = "Wait after 24hours to request again";
          setTimeout(() => {
            this.request_error = "";
          }, 3000);
        }
      })
    }
    else
    {
      this.request_error = "Your insurance is not yet verified.";
          setTimeout(() => {
            this.request_error = "";
          }, 3000);
    }
  }

}
