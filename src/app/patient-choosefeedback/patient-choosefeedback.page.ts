/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable curly */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable no-var */
import { SharedDataService } from './../services/shared-data.service';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-choosefeedback',
  templateUrl: './patient-choosefeedback.page.html',
  styleUrls: ['./patient-choosefeedback.page.scss'],
})
export class PatientChoosefeedbackPage implements OnInit {
  selectTabs = "Doctors";
  list: any = [];
  spList: any = [];

  searchNamedoc: string = "";
  searchNameins: string = "";
  searchNamelab: string = "";

  constructor(public userservice: UserService,public router: Router,public share: SharedDataService) { }
  ngOnInit(): void {

    localStorage.removeItem('data');
    this.doctor_list();
    this.get_healthList();
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
      //console.log(this.list)
    })
  }
  get_healthList()
  {
    var data;
    var tempArray = [];
    this.userservice.get_HealthInsurance().then(e=>{
      e.forEach(item=>{
        this.userservice.get_avatar(item.id).then(res=>{
          data = item.data();
          data.uid = item.id;
          data.image = res.data().image;
          tempArray.push(data);
        }).then(()=>{
          this.list = tempArray.filter(a=>{
            if(a.name != undefined)
             return a.name.toLocaleLowerCase().match(this.searchNameins.toLocaleLowerCase());
          })
        })
      })
    })
  }

  view_review_insurance(e)
  {
    this.share.set_list(e);
    this.router.navigate(['/patient-insurancefeedback']);
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

}
