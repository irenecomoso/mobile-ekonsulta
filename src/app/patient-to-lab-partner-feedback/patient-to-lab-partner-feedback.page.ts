/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable curly */
import { Router } from '@angular/router';
/* eslint-disable one-var */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
import { UserService } from './../services/user.service';
import { SharedDataService } from './../services/shared-data.service';
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable eqeqeq */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-to-lab-partner-feedback',
  templateUrl: './patient-to-lab-partner-feedback.page.html',
  styleUrls: ['./patient-to-lab-partner-feedback.page.scss'],
})
export class PatientToLabPartnerFeedbackPage implements OnInit {
  list: any = [];
  spList: any = [];
  searchNamelab: string = "";

  constructor(public userservice: UserService,public router: Router,public share: SharedDataService) { }
  ngOnInit(): void {

    localStorage.removeItem('data');
    this.get_labList();

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
  get_labList()
  {
    var data;
    var tempArray = [];
    this.userservice.get_labPartner().forEach(e=>{
      e.forEach(item=>{
        this.userservice.get_avatar(item.id).then(res=>{
          data = item.data();
          data.uid = item.id;
          data.image = res.data().image;
          tempArray.push(data);
        }).then(()=>{
          this.list = tempArray.filter(a=>{
            if(a.name != undefined)
            return a.name.toLocaleLowerCase().match(this.searchNamelab.toLocaleLowerCase())
          })
        })
      })
    })
    this.list = tempArray;
  }
  view_review_lab(e)
  {
    this.share.set_list(e);
    this.router.navigate(['/patient-labfeedback']);
  }
  back(){
    localStorage.removeItem('data');
    this.router.navigate(['/patient-choosefeedback']);
  }
}
