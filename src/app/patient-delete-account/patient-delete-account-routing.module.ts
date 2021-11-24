import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientDeleteAccountPage } from './patient-delete-account.page';

const routes: Routes = [
  {
    path: '',
    component: PatientDeleteAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientDeleteAccountPageRoutingModule {}
