import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { OrderComponent } from './order/order.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared/shared.module';
import { ShowOrderComponent } from './order/show-order/show-order.component';
import { AdminLoginComponent } from './login/login.component';
import { UpdateOrderItemStatusComponent } from './order/show-order/update-order-item-status/update-order-item-status.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    OrderComponent,
    ShowOrderComponent,
    AdminLoginComponent,
    UpdateOrderItemStatusComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }
