/* eslint-disable @typescript-eslint/member-ordering */
import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-var */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-myrecords',
  templateUrl: './patient-myrecords.page.html',
  styleUrls: ['./patient-myrecords.page.scss'],
})
export class PatientMyrecordsPage implements OnInit {
  selectTabs= 'medRecords';
  userID: any = "";
  info: any = [];
  list: any = [];

  loaList: any = [];
  presList: any = [];
  medicalList: any = [];
  constructor(public userservice: UserService, public afu: AuthService) { }

  /** set to false so that when loading the user analytics page, content of that function is not displayed */
  medicalrecords = false;
  labresult = false;
  presc =  false;
  insurance_loa = false;

  medicalRecords(){
    this.medicalrecords = true;
    this.labresult = false;
    this.presc = false;
    this.insurance_loa = false;
  }

  labResult(){
    this.medicalrecords = false;
    this.labresult = true;
    this.presc = false;
    this.insurance_loa = false;
  }

  prescription(){
    this.medicalrecords = false;
    this.labresult = false;
    this.presc = true;
    this.insurance_loa = false;
  }
  insuranceLOA()
  {
    this.medicalrecords = false;
    this.labresult = false;
    this.presc = false;
    this.insurance_loa = true;
  }

  ngOnInit(): void {
    this.userID = this.afu.get_UID();
    this.lab_Result();
    this.insurance_LOA();
    this.medical_record();
    this.prescription_record();
  }

  lab_Result()
  {
    var data;
    var tempArray = [];
    this.userservice.get_UserInfo(this.userID).then(e=>{
      this.info = e.data();
    }).then(()=>{
      this.userservice.get_Lab_Results_Patient(this.info.email).then(e => {
        e.forEach(item => {
          if(item.data().status != 'pending')
          {
            this.userservice.get_labInfo(item.data().diagnostic_center)
            .forEach(res=>{
              data = item.data();
             //data.from = res.data();// data.from = res.data().name;
              tempArray.push(data);
              //console.log(data);
            })
          }
        })
      })
    })
    this.list = tempArray;
    console.log(this.list);
  }

  insurance_LOA()
  {
    var data;
    var tempArray = [];
    this.userservice.get_patient_LOA(this.userID).then(e=>{
      e.forEach(item=>{
        this.userservice.get_UserInfo(this.userID).then(res=>{
          data = item.data();
          data.id = item.id;
          data.fullname = res.data().fullname;
          tempArray.push(data);
        })
      })
    })
    this.loaList = tempArray;
  }

  viewFile(e)
  {
    window.open(e);
  }
  medical_record()
  {
    var data;
    var tempArray = [];
    this.userservice.get_patient_medical(this.userID).then(e=>{
      e.forEach(item=>{
        this.userservice.get_UserInfo(this.userID).then(res=>{
          data = item.data();
          data.uid = item.id;
          data.fullname = res.data().fullname;
          tempArray.push(data)
        })
      })
    })
    this.medicalList = tempArray;
    //console.log(this.medicalList);
  }
  prescription_record()
  {
    var data;
    var tempArray = [];
    this.userservice.get_patient_prescription(this.userID).then(e=>{
      e.forEach(item=>{
        console.log(item.data());
        data = item.data();
        data.id = item.id;
        tempArray.push(data);
      })
    })
    this.presList = tempArray;
  }

}
