import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientLabfeedbackPage } from './patient-labfeedback.page';

const routes: Routes = [
  {
    path: '',
    component: PatientLabfeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientLabfeedbackPageRoutingModule {}
