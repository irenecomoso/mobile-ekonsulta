/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable curly */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/semi */
import { NotificationService } from './../services/notification.service';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-patient-shared-files',
  templateUrl: './patient-shared-files.page.html',
  styleUrls: ['./patient-shared-files.page.scss'],
})
export class PatientSharedFilesPage implements OnInit {
  selectTabs = "medRecords";

  userid: string = ""; // Doctor ID
  patientInfo: any = []; //Patient Information includng its ID
  chat_id: string = "";

  content: string = "";
  chat$: Observable<any>;
  info: any =[];
  sharedList: any = [];

  imgUrl: any;

  file1: any = "";
  file2: any = "";

  filename: string = "";
  filename2: string = "";
  flag: number = 0;
  tempArray = [];

  error_message = "";
  success_message = "";


  medList: any = [];
  labList: any = [];
  presList: any = [];

  constructor(
    public afu: AuthService,
    public userservice: UserService,
    public router: Router,
    //public notif: NotificationService
  ) { }

  ngOnInit(): void {

    this.userid = this.afu.get_UID();
    this.userservice.get_avatar(this.userid).then(e=>{
      this.imgUrl = e.data().image;
    })
    this.patientInfo = JSON.parse(localStorage.getItem('data'));
    this.fileShared();
    this.get_medicalRecord();
    this.get_labRecord();
    this.prescription_record();
  }
  get_medicalRecord()
  {
    var data;
    var tempArray = [];


    this.userservice.get_patient_medical(this.userid)
    .then(e=>{
      e.forEach(item=>{
        data = item.data();
        data.uid = item.id;
        data.check = false;
        this.sharedList.forEach(res=>{
          if(item.id == res.file_id)
             data.check = true;
        })
        tempArray.push(data);
      })
    })
    this.medList = tempArray;
    console.log(this.medList);
  }

  fileShared()
  {
    var data;
    var tempArray = [];
    this.userservice.get_shareFiles().then(a=>{
      a.forEach(res=>{
        data = res.data();
        tempArray.push(data);
      })
    });
    this.sharedList=tempArray;
  }

  get_labRecord()
  {
    var data;
    var tempArray = [];
    this.userservice.get_UserInfo(this.userid).then(e=>{
      this.info = e.data();
    }).then(()=>{
      this.userservice.get_Lab_Results_Patient(this.info.email).then(e => {
        e.forEach(item => {
          if(item.data().status != 'pending')
          {
            this.userservice.get_labInfo(item.data().diagnostic_center)
            .forEach(res=>{
              data = item.data();
              data.uid = item.id;
              //data.from = res.data().name;
              data.check = false;
              this.sharedList.forEach(res=>{
                if(item.id == res.file_id)
                   data.check = true;
              })
              tempArray.push(data);
            })
          }
        })
      })
    })
    this.labList = tempArray;
    console.log(this.labList);
  }

  prescription_record()
  {
    var data;
    var tempArray = [];
    this.userservice.get_patient_prescription(this.userid).then(e=>{
      e.forEach(item=>{
        console.log(item.data());
        data = item.data();
        data.uid = item.id;
        data.check = false;
        this.sharedList.forEach(res=>{
          if(item.id == res.file_id)
             data.check = true;
        })
        tempArray.push(data);
      })
    })
    this.presList = tempArray;
  }
  uploadMedical()
  {
    if(this.filename != "" && this.file1 != "")
    {
      console.log(this.file1);
      this.userservice.send_medicalRecord(this.patientInfo.uid,this.userid,this.filename+".pdf",this.file1)
      .catch(error=>{
        console.log(error)
      }).then(()=>{
        console.log("Stored successfully!");
        this.success_message = "File sent successfully!";

        let record2 ={};
        record2['title'] = "Medical Certificate"
        record2['description'] = "A doctor sent a medical Certificate. Check your Records now!";
        record2['createdAt'] = formatDate(new Date(),'short','en');
        record2['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
        //this.notif.send_patient(this.patientInfo.uid,record2);
        this.router.navigate[('/patient-doctor-chat')];
        setTimeout(() => {
          this.success_message = "";
        }, 5000);
      })
    }
    else{
      console.log('Empty Fields');
      this.error_message = "Empty Fields!";
      setTimeout(() => {
        this.error_message = "";
      }, 5000);
    }
  }
  choosefile2(e)
  {
    this.file1 = e.target.files[0];
    console.log(this.file1);
  }
  open(file)
  {
    window.open(file);
  }
  chooseShare(file,isChecked: boolean)
  {
    if(isChecked)
    {
      this.tempArray.push(file);
      this.flag++;
    }
    else
    {
      var index = this.tempArray.findIndex(x => x.value ===file);
      this.tempArray.splice(index);
    }
    console.log(this.tempArray);
  }

}
