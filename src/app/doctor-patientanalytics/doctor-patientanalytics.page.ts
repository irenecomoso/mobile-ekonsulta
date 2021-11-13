import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-patientanalytics',
  templateUrl: './doctor-patientanalytics.page.html',
  styleUrls: ['./doctor-patientanalytics.page.scss'],
})
export class DoctorPatientanalyticsPage implements OnInit {
  selectTabs= 'Daily';
  constructor() { }

  ngOnInit() {
  }

}
