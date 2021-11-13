import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorPatientanalyticsPage } from './doctor-patientanalytics.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorPatientanalyticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorPatientanalyticsPageRoutingModule {}
