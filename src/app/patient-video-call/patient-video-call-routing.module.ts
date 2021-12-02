import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientVideoCallPage } from './patient-video-call.page';

const routes: Routes = [
  {
    path: '',
    component: PatientVideoCallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientVideoCallPageRoutingModule {}
