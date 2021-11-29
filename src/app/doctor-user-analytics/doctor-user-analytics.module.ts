import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorUserAnalyticsPageRoutingModule } from './doctor-user-analytics-routing.module';

import { DoctorUserAnalyticsPage } from './doctor-user-analytics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorUserAnalyticsPageRoutingModule
  ],
  declarations: [DoctorUserAnalyticsPage]
})
export class DoctorUserAnalyticsPageModule {}
