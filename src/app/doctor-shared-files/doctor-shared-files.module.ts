import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorSharedFilesPageRoutingModule } from './doctor-shared-files-routing.module';

import { DoctorSharedFilesPage } from './doctor-shared-files.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorSharedFilesPageRoutingModule
  ],
  declarations: [DoctorSharedFilesPage]
})
export class DoctorSharedFilesPageModule {}
