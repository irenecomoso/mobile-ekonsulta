import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientInsurancefeedbackPage } from './patient-insurancefeedback.page';

const routes: Routes = [
  {
    path: '',
    component: PatientInsurancefeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientInsurancefeedbackPageRoutingModule {}
