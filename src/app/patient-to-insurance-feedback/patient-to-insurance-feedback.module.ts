import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientToInsuranceFeedbackPageRoutingModule } from './patient-to-insurance-feedback-routing.module';

import { PatientToInsuranceFeedbackPage } from './patient-to-insurance-feedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientToInsuranceFeedbackPageRoutingModule
  ],
  declarations: [PatientToInsuranceFeedbackPage]
})
export class PatientToInsuranceFeedbackPageModule {}
