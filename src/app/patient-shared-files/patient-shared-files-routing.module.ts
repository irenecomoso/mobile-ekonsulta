import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientSharedFilesPage } from './patient-shared-files.page';

const routes: Routes = [
  {
    path: '',
    component: PatientSharedFilesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientSharedFilesPageRoutingModule {}
