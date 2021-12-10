/* eslint-disable no-var */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { UserService } from './../services/user.service';
import { AuthService } from 'src/app/services/auth.service';
/* eslint-disable @typescript-eslint/semi */
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-patient-delete-account',
  templateUrl: './patient-delete-account.page.html',
  styleUrls: ['./patient-delete-account.page.scss'],
})
export class PatientDeleteAccountPage implements OnInit {
  userID: string = "";
  imgUrl: any;
  info: any = [];
  insList: any = [];
  file: any;

  insurance_info: any = [];

  request_error: string = "";
  request_sent: string = "";

  health_insurance: string = "";
  member_ID: string = "";
  error: { name: string;message: string } = { name: '', message: ''};
  profile_changed: boolean = false;
  constructor(public alertCtrl: AlertController, private router: Router, public toast: ToastController,
    public afu: AuthService, public userservice: UserService) { }

    ngOnInit(): void {
      localStorage.removeItem('data');
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
    this.userservice.delete_user(this.userID);
    console.log(this.info.fullname);
  }

}
