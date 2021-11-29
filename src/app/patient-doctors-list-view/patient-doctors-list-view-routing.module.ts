import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientDoctorsListViewPage } from './patient-doctors-list-view.page';

const routes: Routes = [
  {
    path: '',
    component: PatientDoctorsListViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientDoctorsListViewPageRoutingModule {}
