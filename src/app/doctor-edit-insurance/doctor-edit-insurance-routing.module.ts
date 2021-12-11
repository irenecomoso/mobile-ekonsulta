import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorEditInsurancePage } from './doctor-edit-insurance.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorEditInsurancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorEditInsurancePageRoutingModule {}
