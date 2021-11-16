import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientDoctorfeedbackPage } from './patient-doctorfeedback.page';

const routes: Routes = [
  {
    path: '',
    component: PatientDoctorfeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientDoctorfeedbackPageRoutingModule {}
