import { SharedDataService } from './../services/shared-data.service';
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable eqeqeq */
/* eslint-disable no-var */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-doctors-list',
  templateUrl: './patient-doctors-list.page.html',
  styleUrls: ['./patient-doctors-list.page.scss'],
})
export class PatientDoctorsListPage implements OnInit {
  list: any = [];
  spList: any = [];

  searchName: string;

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
  view_review(e)
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
            return e.fullname.toLocaleLowerCase().match(this.searchName.toLocaleLowerCase());
          });
        })
      })
      //console.log(this.list)
    })
  }

}

