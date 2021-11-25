import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorDeleteAccountPage } from './doctor-delete-account.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorDeleteAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorDeleteAccountPageRoutingModule {}
