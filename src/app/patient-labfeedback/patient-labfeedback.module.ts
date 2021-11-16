import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientLabfeedbackPageRoutingModule } from './patient-labfeedback-routing.module';

import { PatientLabfeedbackPage } from './patient-labfeedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientLabfeedbackPageRoutingModule
  ],
  declarations: [PatientLabfeedbackPage]
})
export class PatientLabfeedbackPageModule {}
