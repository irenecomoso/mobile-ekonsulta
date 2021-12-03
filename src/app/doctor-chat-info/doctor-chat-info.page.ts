/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { NotificationService } from './../services/notification.service';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-chat-info',
  templateUrl: './doctor-chat-info.page.html',
  styleUrls: ['./doctor-chat-info.page.scss'],
})
export class DoctorChatInfoPage implements OnInit {
  userid: string = ""; // Doctor ID
  patientInfo: any = []; //Patient Information includng its ID
  chat_id: string = "";

  content: string = "";

  imgUrl: any;

  file1: any = "";
  file2: any = "";

  filename: string = "";
  filename2: string = "";

  error_message = "";
  success_message = "";


  medList: any = [];
  labList: any = [];
  presList: any = [];

  constructor(
    public afu: AuthService,
    public userservice: UserService,
    public router: Router,
    public notif: NotificationService
  ) { }

  ngOnInit(): void {

    this.userid = this.afu.get_UID();
    this.userservice.get_avatar(this.userid).then(e=>{
      this.imgUrl = e.data().image;
    })
    this.patientInfo = JSON.parse(localStorage.getItem('data'));
  }
   /* this.get_medical();
    this.get_lab();
    this.get_prescription();
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
        this.notif.send_patient(this.patientInfo.uid,record2);

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
  close()
  {
    this.filename = "";
    this.filename2 = "";
    this.files.nativeElement.value = "";
    this.files2.nativeElement.value= "";
  }
  finish_consultation()
  {
    let record = {};
    this.userservice.get_upcoming(this.patientInfo.upcoming_id).then(e=>{
      record['createdAt'] = formatDate(new Date(),'MM/dd/yyyy','en');
      record['doctor_id'] = e.data().doctor_id;
      record['patient_id'] = e.data().patient_id;
      record['schedule'] = e.data().schedule;
      record['consultation_schedule'] = e.data().consultation_schedule;
      record['time'] = e.data().time;
      record['status'] = "done";
    }).then(()=>{
      this.userservice.remove_upcoming(this.patientInfo.upcoming_id).then(()=>{
        console.log('Upcoming removed!')

        this.userservice.remove_share(this.userid,this.patientInfo.uid);

      }).then(()=>{
        this.userservice.create_consultation(record).then(()=>{
          console.log('Consultation Record Created!');
          this.router.navigate(['doctor-patients']);

          let record2 ={};
          record2['title'] = "Consultation Finished"
          record2['description'] = "Congratulations! You have finished your Consultation!";
          record2['createdAt'] = formatDate(new Date(),'short','en');
          this.notif.send_patient(this.patientInfo.uid,record2);
        })
      })
    });
  }
  open(file)
  {
    window.open(file);
  }
  get_medical()
  {
    var data;
    var tempArray = [];
    this.userservice.get_sharedFile(this.userid,this.patientInfo.uid)
    .onSnapshot(snapshot=>{
      let changes = snapshot.docChanges();
      changes.forEach(item=>{
        this.userservice.get_medical_shared(item.doc.data().file_id)
        .then(e=>{
          if(e.exists)
          {
            data = e.data();
            data.uid = e.id;
            tempArray.push(data);
          }
        })
      })
    })
    this.medList = tempArray;
    console.log(this.medList);
  }
  get_lab()
  {
    var data;
    var tempArray = [];
    this.userservice.get_sharedFile(this.userid,this.patientInfo.uid)
    .onSnapshot(snapshot=>{
      let changes = snapshot.docChanges();
      changes.forEach(item=>{
        this.userservice.get_lab_shared(item.doc.data().file_id)
        .then(e=>{
          if(e.exists)
          {
            console.log(e.data());
            data = e.data();
            data.uid = e.id;
            tempArray.push(data);
          }
        })
      })
    })
    this.labList = tempArray;
    console.log(this.labList);
  }

  get_prescription()
  {
    var data;
    var tempArray = [];
    this.userservice.get_sharedFile(this.userid,this.patientInfo.uid)
    .onSnapshot(snapshot=>{
      let changes = snapshot.docChanges();
      changes.forEach(item=>{
        this.userservice.get_prescription_shared(item.doc.data().file_id)
        .then(e=>{
          if(e.exists)
          {
            console.log(e.data());
            data = e.data();
            data.uid = e.id;
            tempArray.push(data);
          }
        })
      })
    })
    this.presList = tempArray;
    console.log(this.presList);
  }*/

}
