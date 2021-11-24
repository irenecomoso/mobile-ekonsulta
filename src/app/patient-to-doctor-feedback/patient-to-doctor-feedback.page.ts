/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable curly */
import { Router } from '@angular/router';
/* eslint-disable one-var */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from './../services/user.service';
import { SharedDataService } from './../services/shared-data.service';
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable eqeqeq */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-to-doctor-feedback',
  templateUrl: './patient-to-doctor-feedback.page.html',
  styleUrls: ['./patient-to-doctor-feedback.page.scss'],
})
export class PatientToDoctorFeedbackPage implements OnInit {
  list: any = [];
  spList: any = [];

  searchNamedoc: string = "";

  constructor(public userservice: UserService,public router: Router,public share: SharedDataService) { }
  ngOnInit(): void {

    localStorage.removeItem('data');
    this.doctor_list();

    var data;
    var tempArray = [];
    this.userservice.get_Speciaalization().then(e=>{
      e.forEach(res=>{
        data = res.data();
        data.uid = res.id;
        tempArray.push(data);
      })
    })
    this.spList = tempArray;
    console.log(this.spList);

  }
  view_review_doc(e)
  {
    this.share.set_list(e);
    this.router.navigate(['/patient-doctorfeedback']);
  }

  doctor_list()
  {
    var data;
    var tempArray = [];
    this.userservice.get_doctorList().then(e=>{
      e.forEach(item=>{
        this.userservice.get_avatar(item.id).then(res=>{
          data = item.data();
          data.uid = item.id;
          data.image = res.data().image;
          tempArray.push(data);
        }).then(()=>{
          this.list = tempArray.filter(e=>{
            if(e.fullname != undefined)
            return e.fullname.toLocaleLowerCase().match(this.searchNamedoc.toLocaleLowerCase());
          });
        })
      })
    })
  }
  back(){
    localStorage.removeItem('data');
    this.router.navigate(['/patient-choosefeedback']);
  }
}
