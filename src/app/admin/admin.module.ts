import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { OrderComponent } from './order/order.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared/shared.module';


@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class AdminModule { }
