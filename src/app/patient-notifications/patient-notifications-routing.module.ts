import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientNotificationsPage } from './patient-notifications.page';

const routes: Routes = [
  {
    path: '',
    component: PatientNotificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientNotificationsPageRoutingModule {}
