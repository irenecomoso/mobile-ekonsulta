import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientChoosefeedbackPageRoutingModule } from './patient-choosefeedback-routing.module';

import { PatientChoosefeedbackPage } from './patient-choosefeedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientChoosefeedbackPageRoutingModule
  ],
  declarations: [PatientChoosefeedbackPage]
})
export class PatientChoosefeedbackPageModule {}
