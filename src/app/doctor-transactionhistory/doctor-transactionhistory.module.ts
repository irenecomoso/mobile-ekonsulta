import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorTransactionhistoryPageRoutingModule } from './doctor-transactionhistory-routing.module';

import { DoctorTransactionhistoryPage } from './doctor-transactionhistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorTransactionhistoryPageRoutingModule
  ],
  declarations: [DoctorTransactionhistoryPage]
})
export class DoctorTransactionhistoryPageModule {}
