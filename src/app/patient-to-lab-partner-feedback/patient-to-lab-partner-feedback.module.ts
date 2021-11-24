import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientToLabPartnerFeedbackPageRoutingModule } from './patient-to-lab-partner-feedback-routing.module';

import { PatientToLabPartnerFeedbackPage } from './patient-to-lab-partner-feedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientToLabPartnerFeedbackPageRoutingModule
  ],
  declarations: [PatientToLabPartnerFeedbackPage]
})
export class PatientToLabPartnerFeedbackPageModule {}
