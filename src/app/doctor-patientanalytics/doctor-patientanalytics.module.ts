import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorPatientanalyticsPageRoutingModule } from './doctor-patientanalytics-routing.module';

import { DoctorPatientanalyticsPage } from './doctor-patientanalytics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorPatientanalyticsPageRoutingModule
  ],
  declarations: [DoctorPatientanalyticsPage]
})
export class DoctorPatientanalyticsPageModule {}
