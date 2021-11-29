import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientDoctorsListViewPageRoutingModule } from './patient-doctors-list-view-routing.module';

import { PatientDoctorsListViewPage } from './patient-doctors-list-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientDoctorsListViewPageRoutingModule
  ],
  declarations: [PatientDoctorsListViewPage]
})
export class PatientDoctorsListViewPageModule {}
