/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-var */
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from './../services/user.service';
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { DoctorInfo } from './../doctor-profile/doctor-profile.page';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-doctor-delete-account',
  templateUrl: './doctor-delete-account.page.html',
  styleUrls: ['./doctor-delete-account.page.scss'],
})
export class DoctorDeleteAccountPage implements OnInit {
  model = new DoctorInfo();
  info: any = [];
  userId: string = "";
  spInfo: any = [];
  spList: any = [];
  imgUrl: any;
  file: any;
  form: FormGroup;

  constructor(public alertCtrl: AlertController, private router: Router, public toast: ToastController,
    public userservice: UserService, public afu: AuthService) { }
    ngOnInit(): void {
      this.userId = this.afu.get_UID();
      this.userservice.get_patientInfo(this.userId).then(e=>{
       // console.log(e.data());
        this.info = e.data();
      }).then(()=>{
        this.userservice.get_specializationInfo(this.info.specialization).then(e=>{
          this.spInfo = e.data();
        })
      })
      this.userservice.get_avatar(this.userId).then(e=>{
        this.imgUrl = e.data().image;
      })
      var data;
      var tempArray = [];
      this.userservice.get_Speciaalization().then(e=>{
        e.forEach(item=>{
          data = item.data();
          data.uid = item.id;
          tempArray.push(data);
        })
      })
      this.spList = tempArray;
    }
    async showAlert() {
    const alert = await this.alertCtrl.create({
    header: 'Warning',
    subHeader: 'This action is irreversible. ',
    message: 'Continue Account Deletion?',
    buttons: [
      {
        text: 'Cancel',
        handler: (data: any) => {
          console.log('Canceled', data);
        }
      },
      {
        text: 'Delete Account',
        handler: (data: any) => {
          this.delete_account();
          this.router.navigate(['/login'])
        }
      }
    ]
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
    }
  delete_account()
  {
    this.afu.delete_user().then(()=>{
      console.log('authentication deleted!');
    });
    this.userservice.delete_user(this.userId);
  }

}
