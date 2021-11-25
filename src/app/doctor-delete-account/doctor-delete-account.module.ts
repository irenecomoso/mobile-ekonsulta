import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorDeleteAccountPageRoutingModule } from './doctor-delete-account-routing.module';

import { DoctorDeleteAccountPage } from './doctor-delete-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorDeleteAccountPageRoutingModule
  ],
  declarations: [DoctorDeleteAccountPage]
})
export class DoctorDeleteAccountPageModule {}
