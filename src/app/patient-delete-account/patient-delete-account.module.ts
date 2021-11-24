import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientDeleteAccountPageRoutingModule } from './patient-delete-account-routing.module';

import { PatientDeleteAccountPage } from './patient-delete-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientDeleteAccountPageRoutingModule
  ],
  declarations: [PatientDeleteAccountPage]
})
export class PatientDeleteAccountPageModule {}
