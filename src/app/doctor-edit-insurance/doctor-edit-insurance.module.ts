import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorEditInsurancePageRoutingModule } from './doctor-edit-insurance-routing.module';

import { DoctorEditInsurancePage } from './doctor-edit-insurance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorEditInsurancePageRoutingModule
  ],
  declarations: [DoctorEditInsurancePage]
})
export class DoctorEditInsurancePageModule {}
