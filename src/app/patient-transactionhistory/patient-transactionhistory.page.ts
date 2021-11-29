import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-patient-transactionhistory',
  templateUrl: './patient-transactionhistory.page.html',
  styleUrls: ['./patient-transactionhistory.page.scss'],
})
export class PatientTransactionhistoryPage implements OnInit {

  constructor(private menu: MenuController) { }

  patientMenu() {
    this.menu.enable(true, 'first');
  }

  ngOnInit() {
    console.log("Transaction TEST");
    this.patientMenu();
  }

}
