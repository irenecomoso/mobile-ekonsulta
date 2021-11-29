import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorUserAnalyticsPage } from './doctor-user-analytics.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorUserAnalyticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorUserAnalyticsPageRoutingModule {}
