import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientCancelConsultationPage } from './patient-cancel-consultation.page';

const routes: Routes = [
  {
    path: '',
    component: PatientCancelConsultationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientCancelConsultationPageRoutingModule {}
