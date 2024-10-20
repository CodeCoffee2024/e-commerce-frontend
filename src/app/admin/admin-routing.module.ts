import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,  // This will load the admin layout with router-outlet
    children: [
      { path: 'dashboard', component: AdminDashboardComponent }, // Route for the dashboard
      { path: 'order', component: OrderComponent }, // Route for the dashboard
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }    // Default redirect
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
