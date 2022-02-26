import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientCancelConsultationPageRoutingModule } from './patient-cancel-consultation-routing.module';

import { PatientCancelConsultationPage } from './patient-cancel-consultation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientCancelConsultationPageRoutingModule
  ],
  declarations: [PatientCancelConsultationPage]
})
export class PatientCancelConsultationPageModule {}
