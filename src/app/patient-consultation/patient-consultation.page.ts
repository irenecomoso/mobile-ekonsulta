import { AlertController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/dot-notation */
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
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-patient-consultation',
  templateUrl: './patient-consultation.page.html',
  styleUrls: ['./patient-consultation.page.scss'],
})
export class PatientConsultationPage implements OnInit {
  @ViewChild('paypal', {static: true}) paypalElement: ElementRef
  selectTabs= 'upcoming';

  userid: any;
  currentDate: string = "";

  docList: any = [];
  doneList: any = [];

  error_message: string = "";
  info: any = [];

  constructor(
    public userservice: UserService,
    public afu: AuthService,
    public router: Router,
    private menu: MenuController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit(): void {
    //getting the current Date
    this.currentDate = formatDate(new Date(),'MM/dd/yyyy hh:mm','en');
    this.patientMenu();
    localStorage.removeItem('data');

    this.userid = this.afu.get_UID();
    this.get_upcoming();
    this.get_done();
    this.paypalButton();
  }
  patientMenu() {
    this.menu.enable(true, 'first');
  }
  async showAlert(list) {
    const alert = await this.alertCtrl.create({
    header: 'Warning',
    subHeader: 'Reimbursement of -20% from your payment upon cancelation ',
    message: 'Continue Cancel Consultation?',
    buttons: [
      {
        text: 'Discard',
        handler: (data: any) => {
          console.log('Canceled', data);
        }
      },
      {
        text: 'Continue',
        handler: (data: any) => {
          this.editCancel(list);
          this.cancel();
          //this.router.navigate(['/login'])
        }
      }
    ]
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
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
  paypalButton()
  {
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
            data.createdAt = e.doc.data().createdAt;
            data.cancelLimit = e.doc.data().cancelLimit;
            data.schedule = e.doc.data().schedule;
            data.schedtime = e.doc.data().time;
            data.upcoming_id = e.doc.id;
            data.consultation_schedule = e.doc.data().consultation_schedule;
            data.paymentType = e.doc.data().paymentType;
            data.transaction_id = e.doc.data().transaction_id;
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
  editCancel(info)
  {
    this.info = info;
    this.router.navigate(['/patient-cancel-consultation']);
  }
  cancel()
  {
    console.log(this.info);
    let record = {};
    record['patient_id'] = this.userid;
    record['upcoming_id'] = this.info.upcoming_id;
    record['transaction_id'] = this.info.transaction_id;
    this.userservice.cancel_consultation(record)
    .then(()=>{
      //send notification for cancellation
      let record = {};
      record['title'] = "Cancelled Consultaion";
      record['description'] = "A Patient want to cancel its consultation";
      record['createdAt'] = formatDate(new Date(),'short','en');
      record['id'] = new Date(formatDate(new Date(),'short','en')).getTime()
      this.userservice.get_admin().then(e=>{
        e.forEach(item=>{
          //this.notif.send_admin(item.id,record);
        })
      })
      record['description'] = "A Patient cancelled its consultation";
      //this.notif.send_doctor(this.info.uid,record);
      document.getElementById('closeModal').click();
      this.info = [];
      this.ngOnInit();
    });
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
