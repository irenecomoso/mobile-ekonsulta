import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorMedicalCertificatePage } from './doctor-medical-certificate.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorMedicalCertificatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorMedicalCertificatePageRoutingModule {}
