import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorPatientprescriptionPageRoutingModule } from './doctor-patientprescription-routing.module';

import { DoctorPatientprescriptionPage } from './doctor-patientprescription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorPatientprescriptionPageRoutingModule
  ],
  declarations: [DoctorPatientprescriptionPage]
})
export class DoctorPatientprescriptionPageModule {}
