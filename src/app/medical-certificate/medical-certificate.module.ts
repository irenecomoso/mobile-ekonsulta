import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalCertificatePageRoutingModule } from './medical-certificate-routing.module';

import { MedicalCertificatePage } from './medical-certificate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalCertificatePageRoutingModule
  ],
  declarations: [MedicalCertificatePage]
})
export class MedicalCertificatePageModule {}
