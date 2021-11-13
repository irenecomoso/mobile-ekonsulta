import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorTransactionhistoryPage } from './doctor-transactionhistory.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorTransactionhistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorTransactionhistoryPageRoutingModule {}
