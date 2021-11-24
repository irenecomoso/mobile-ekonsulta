import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientEditInsurancePageRoutingModule } from './patient-edit-insurance-routing.module';

import { PatientEditInsurancePage } from './patient-edit-insurance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientEditInsurancePageRoutingModule
  ],
  declarations: [PatientEditInsurancePage]
})
export class PatientEditInsurancePageModule {}
