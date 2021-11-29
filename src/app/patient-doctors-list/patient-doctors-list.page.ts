/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable eqeqeq */
/* eslint-disable no-var */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-doctors-list',
  templateUrl: './patient-doctors-list.page.html',
  styleUrls: ['./patient-doctors-list.page.scss'],
})
export class PatientDoctorsListPage implements OnInit {
  docList: any = [];
  searchName: string = "";
  selectTabs = 'Doctors';

  constructor(
    public userservice: UserService,
    public router: Router
    ) { }

  ngOnInit(): void {

    localStorage.removeItem('data');

    this.get_doctorList();

  }

  book_doctor_view(info)
  {
    if(localStorage.getItem('data') == null)
      localStorage.setItem('data',JSON.stringify(info));

    this.router.navigate(['patient-doctors-list-view']);
  }

  get_doctorList()
  {
    var data;
    var tempArray = [];
    this.userservice.get_doctorList().then(e=>{
      e.forEach(item=>{
        if(item.data().isVerified == "verified") //only verified will show
        this.userservice.get_avatar(item.id).then(res=>{
          this.userservice.get_specializationInfo(item.data().specialization).then(a=>{
            data = item.data();
            data.uid = item.id;
            data.ins = a.data().name;
            data.image = res.data().image;
            tempArray.push(data);
          }).then(()=>{
            this.docList = tempArray.filter(e=>{
              if(e.fullname != undefined)
              return e.fullname.toLocaleLowerCase().match(this.searchName.toLocaleLowerCase());
            });
          })
        })
      })
    })
  }

}

