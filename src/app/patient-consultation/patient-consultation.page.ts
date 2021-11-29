import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-patient-consultation',
  templateUrl: './patient-consultation.page.html',
  styleUrls: ['./patient-consultation.page.scss'],
})
export class PatientConsultationPage implements OnInit {
  selectTabs= 'upcoming';
  constructor(private menu: MenuController) { }

  patientMenu() {
    this.menu.enable(true, 'first');
  }
  ngOnInit() {
    console.log("TEST");
    this.patientMenu();
  }

}
