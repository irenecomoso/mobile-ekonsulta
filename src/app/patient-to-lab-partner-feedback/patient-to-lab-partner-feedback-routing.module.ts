import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientToLabPartnerFeedbackPage } from './patient-to-lab-partner-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: PatientToLabPartnerFeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientToLabPartnerFeedbackPageRoutingModule {}
