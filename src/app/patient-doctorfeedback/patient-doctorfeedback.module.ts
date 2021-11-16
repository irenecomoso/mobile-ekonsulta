import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientDoctorfeedbackPageRoutingModule } from './patient-doctorfeedback-routing.module';

import { PatientDoctorfeedbackPage } from './patient-doctorfeedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientDoctorfeedbackPageRoutingModule
  ],
  declarations: [PatientDoctorfeedbackPage]
})
export class PatientDoctorfeedbackPageModule {}
