import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorSetConsultationFeePage } from './doctor-set-consultation-fee.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorSetConsultationFeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorSetConsultationFeePageRoutingModule {}
