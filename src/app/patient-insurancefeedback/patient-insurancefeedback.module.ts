import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientInsurancefeedbackPageRoutingModule } from './patient-insurancefeedback-routing.module';

import { PatientInsurancefeedbackPage } from './patient-insurancefeedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientInsurancefeedbackPageRoutingModule
  ],
  declarations: [PatientInsurancefeedbackPage]
})
export class PatientInsurancefeedbackPageModule {}
