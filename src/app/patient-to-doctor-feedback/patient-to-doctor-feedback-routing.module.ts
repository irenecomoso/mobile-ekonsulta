import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientToDoctorFeedbackPage } from './patient-to-doctor-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: PatientToDoctorFeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientToDoctorFeedbackPageRoutingModule {}
