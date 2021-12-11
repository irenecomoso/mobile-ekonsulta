import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientSharedFilesPageRoutingModule } from './patient-shared-files-routing.module';

import { PatientSharedFilesPage } from './patient-shared-files.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientSharedFilesPageRoutingModule
  ],
  declarations: [PatientSharedFilesPage]
})
export class PatientSharedFilesPageModule {}
