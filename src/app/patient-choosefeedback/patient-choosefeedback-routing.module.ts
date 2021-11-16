import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientChoosefeedbackPage } from './patient-choosefeedback.page';

const routes: Routes = [
  {
    path: '',
    component: PatientChoosefeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientChoosefeedbackPageRoutingModule {}
