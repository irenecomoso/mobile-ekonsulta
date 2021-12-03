import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorMedicalCertificatePageRoutingModule } from './doctor-medical-certificate-routing.module';

import { DoctorMedicalCertificatePage } from './doctor-medical-certificate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorMedicalCertificatePageRoutingModule
  ],
  declarations: [DoctorMedicalCertificatePage]
})
export class DoctorMedicalCertificatePageModule {}
