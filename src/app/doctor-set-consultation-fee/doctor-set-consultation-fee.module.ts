import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorSetConsultationFeePageRoutingModule } from './doctor-set-consultation-fee-routing.module';

import { DoctorSetConsultationFeePage } from './doctor-set-consultation-fee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorSetConsultationFeePageRoutingModule
  ],
  declarations: [DoctorSetConsultationFeePage]
})
export class DoctorSetConsultationFeePageModule {}
