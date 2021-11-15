import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorFeedbackPage } from './doctor-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorFeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorFeedbackPageRoutingModule {}
