import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorPatientprescriptionPage } from './doctor-patientprescription.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorPatientprescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorPatientprescriptionPageRoutingModule {}
