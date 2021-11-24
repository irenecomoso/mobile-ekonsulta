import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientToInsuranceFeedbackPage } from './patient-to-insurance-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: PatientToInsuranceFeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientToInsuranceFeedbackPageRoutingModule {}
