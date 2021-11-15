import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorFeedbackPageRoutingModule } from './doctor-feedback-routing.module';

import { DoctorFeedbackPage } from './doctor-feedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorFeedbackPageRoutingModule
  ],
  declarations: [DoctorFeedbackPage]
})
export class DoctorFeedbackPageModule {}
