import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientEditInsurancePage } from './patient-edit-insurance.page';

const routes: Routes = [
  {
    path: '',
    component: PatientEditInsurancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientEditInsurancePageRoutingModule {}
