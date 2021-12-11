import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorSharedFilesPage } from './doctor-shared-files.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorSharedFilesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorSharedFilesPageRoutingModule {}
