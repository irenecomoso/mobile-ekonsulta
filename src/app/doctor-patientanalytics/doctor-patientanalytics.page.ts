import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-doctor-patientanalytics',
  templateUrl: './doctor-patientanalytics.page.html',
  styleUrls: ['./doctor-patientanalytics.page.scss'],
})
export class DoctorPatientanalyticsPage implements OnInit {
  selectTabs= 'Daily';
  constructor(private menu: MenuController) { }

  doctorMenu() {
    this.menu.enable(true, 'second');
  }

  ngOnInit() {
    this.doctorMenu();
  }

}
