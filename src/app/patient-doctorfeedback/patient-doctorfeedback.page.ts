import { Router } from '@angular/router';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable one-var */
/* eslint-disable no-var */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';
import { SharedDataService } from './../services/shared-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-doctorfeedback',
  templateUrl: './patient-doctorfeedback.page.html',
  styleUrls: ['./patient-doctorfeedback.page.scss'],
})
export class PatientDoctorfeedbackPage implements OnInit {
  info: any = [];
  info2: any = [];

  userId: string;
  userInfo: any = [];

  flist: any = [];
  replyList: any = [];

  feedback: string;
  constructor(public share: SharedDataService,public userservice: UserService, public afu: AuthService, public router: Router) { }

  ngOnInit(): void {

    this.userId = this.afu.get_UID();

    this.userservice.get_patientInfo(this.userId).then(e=>{
      this.userInfo = e.data();
   })

    //getting data from list-of-docts
    this.info = this.share.get_list();
    //saving data into LocalStorage
    if(localStorage.getItem('data')==null)
    {
      localStorage.setItem('data',JSON.stringify(this.info));
    }
    //retrieving data from LocalStorage
    this.info2 = JSON.parse(localStorage.getItem('data'));
    //console.log(this.info2);

    this.get_feedback();
  }
  add_feedback()
  {
    //checks if the user already have a feedback
    this.userservice.userReply_existDoc(this.info2.uid,this.userId)
    .then(e=>{
      //if the user dont have a feedback then
      if(e.empty)
      {
        //checks if the textbox is empty if not then
        if(this.feedback != "")
          {
            //add feedback
            this.userservice.create_Doctor_feedback(this.info2.uid,this.userId,this.feedback,this.userInfo.fullname)
            .then(()=>{
              console.log("Added!");
              this.ngOnInit();
              this.feedback = "";
            })
          }else
            {
              console.log("Textbox is empty!");
            }
        //if the user already have a feedback
       }else
       {
         console.log("Only one feedback!");
       }
    })
  }

  get_feedback()
  {
    var data,data2;
    var tempArray = [],tempArray2=[];

    this.userservice.get_Doctor_Reviews(this.info2.uid).then(e=>{
      e.forEach(item=>{

        this.userservice.get_avatar(item.data().from).then(res=>{
          data = item.data();
          data.uid = item.id;
          data.image = res.data().image;
          tempArray.push(data);
        })

        this.userservice.get_doctorReply(this.info2.uid,item.id).then(res=>{
          res.forEach(a=>{
            data2 = a.data();
            data2.uid = a.id;
            tempArray2.push(data2);
          })
          this.replyList = tempArray2;
        })
      })
    })
    this.flist = tempArray;
    //console.log(this.flist);
  }
  back(){
    localStorage.removeItem('data');
    this.router.navigate(['/patient-to-doctor-feedback']);
  }

}
