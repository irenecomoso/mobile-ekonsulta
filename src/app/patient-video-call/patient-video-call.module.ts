import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientVideoCallPageRoutingModule } from './patient-video-call-routing.module';

import { PatientVideoCallPage } from './patient-video-call.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientVideoCallPageRoutingModule
  ],
  declarations: [PatientVideoCallPage]
})
export class PatientVideoCallPageModule {}
