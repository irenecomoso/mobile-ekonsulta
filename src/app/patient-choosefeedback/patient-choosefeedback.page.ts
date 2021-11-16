import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-choosefeedback',
  templateUrl: './patient-choosefeedback.page.html',
  styleUrls: ['./patient-choosefeedback.page.scss'],
})
export class PatientChoosefeedbackPage implements OnInit {
  selectTabs= 'Doctors';
  constructor() { }

  ngOnInit() {
  }

}
