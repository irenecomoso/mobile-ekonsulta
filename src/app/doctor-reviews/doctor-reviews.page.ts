/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable one-var */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/semi */
import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-doctor-reviews',
  templateUrl: './doctor-reviews.page.html',
  styleUrls: ['./doctor-reviews.page.scss'],

})
export class DoctorReviewsPage implements OnInit {
  userId: string;
  info: any = [];
  imgUrl: any;
  replyList: any = [];
  fList: any = [];

  reply: string;

  reviewId: string = "";
  sent_to: string = "";
  constructor(public userservice: UserService, public afu: AuthService,private menu: MenuController) { }

  doctorMenu() {
    this.menu.enable(true, 'second');
  }

  ngOnInit(): void {
    this.doctorMenu();
    this.userId = this.afu.get_UID();
    this.userservice.get_patientInfo(this.userId).then(e=>{
      this.info = e.data();
      //console.log(this.info);
    })

    this.userservice.get_avatar(this.userId).then(e=>{
      this.imgUrl = e.data().image;
    })

    this.doctor_reviews();
  }

  reply_button(e)
  {
    this.reviewId = e.uid;
    this.sent_to = e.from;
  }
  reply_user(e)
  {
    this.userservice.doctor_reply(this.userId,e.reply,this.info.fullname,this.reviewId,this.sent_to).then(e=>{
      console.log('successfully Replied!');
      this.ngOnInit();
    })
  }
  doctor_reviews()
  {
    var data,data2;
    var tempArray = [],tempArray2=[];
    this.userservice.get_Doctor_Reviews(this.userId).then(e=>{
      e.forEach(item=>{

        this.userservice.get_avatar(item.data().from).then(res=>{
          data = item.data();
          data.uid = item.id;
          data.image = res.data().image;
          tempArray.push(data);
        })

        this.userservice.get_doctorReply(this.userId,item.id).then(res=>{
          res.forEach(a=>{
            data2 = a.data();
            data2.uid = a.id;
            tempArray2.push(data2);
          })
        })
        this.replyList = tempArray2;

      })
    })
    this.fList = tempArray;
  }

}
