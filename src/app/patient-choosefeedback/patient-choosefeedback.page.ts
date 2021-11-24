import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-choosefeedback',
  templateUrl: './patient-choosefeedback.page.html',
  styleUrls: ['./patient-choosefeedback.page.scss'],
})
export class PatientChoosefeedbackPage implements OnInit {

  constructor(public router: Router) { }
  ngOnInit() {
  }
  doc(){
    this.router.navigate(['/patient-to-doctor-feedback']);
  }
  insurance(){
    this.router.navigate(['/patient-to-insurance-feedback']);
  }
  lab(){
    this.router.navigate(['/patient-to-lab-partner-feedback']);
  }
}
