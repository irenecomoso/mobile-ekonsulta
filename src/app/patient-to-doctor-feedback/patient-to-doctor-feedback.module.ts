import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientToDoctorFeedbackPageRoutingModule } from './patient-to-doctor-feedback-routing.module';

import { PatientToDoctorFeedbackPage } from './patient-to-doctor-feedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientToDoctorFeedbackPageRoutingModule
  ],
  declarations: [PatientToDoctorFeedbackPage]
})
export class PatientToDoctorFeedbackPageModule {}
