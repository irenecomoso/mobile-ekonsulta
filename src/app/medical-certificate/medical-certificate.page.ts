/* eslint-disable @typescript-eslint/semi */
/* eslint-disable no-var */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-const */
import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-medical-certificate',
  templateUrl: './medical-certificate.page.html',
  styleUrls: ['./medical-certificate.page.scss'],
})
export class MedicalCertificatePage implements OnInit {
  @ViewChild('content') content: ElementRef;
  patientInfo: any = [];
  doctorInfo: any = [];
  user_id: string = "";
  datetoday: string = "";
  monthDay: string = "";

  constructor(
    public afu: AuthService,
    public userservice: UserService
  ) { }

  ngOnInit() {
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    this.user_id = this.afu.get_UID();
    this.patientInfo = JSON.parse(localStorage.getItem('mc'));
    this.get_doctorInfo();
    this.datetoday = formatDate(new Date(),'long','en');

    const d = new Date();
    let name = month[d.getMonth()];
    this.monthDay = name + ' ' + new Date().getDate();

    if(localStorage.getItem('mc')!=null)
    {
      setTimeout(() => {
        this.downloadPDF();
        localStorage.removeItem('mc');
      }, 1800);
    }
  }
  get_doctorInfo()
  {
    var data;
    this.userservice.get_UserInfo(this.user_id)
    .then(e=>{
      this.userservice.get_specializationInfo(e.data().specialization)
      .then(res=>{
        data = e.data();
        data.spc_name = res.data().name;
        this.doctorInfo = data;
        console.log(this.doctorInfo)
      })
    })
  }
  public downloadPDF()
  {
    html2canvas(document.body).then(canvas=>{
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('l','mm','a4');
      var width = pdf.internal.pageSize.getWidth();
      var height = canvas.height * width / canvas.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);
      pdf.save('medicalCertificate.pdf');
    })
  }

}
