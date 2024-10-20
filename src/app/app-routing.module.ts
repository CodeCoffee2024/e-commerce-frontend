import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { MobileShippingAddressComponent } from './mobile-shipping-address/mobile-shipping-address.component';
import { AddShippingAddressComponent } from './add-shipping-address/add-shipping-address.component';
import { UpdateShippingAddressComponent } from './update-shipping-address/update-shipping-address.component';
import { Page404Component } from './page404/page404.component';
import { Page403Component } from './page403/page403.component';
import { MobileSelectAddressComponent } from './mobile-select-address/mobile-select-address.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, pathMatch: 'full'}, 
  {path: '', component: DashboardComponent, pathMatch: 'full'}, 
  {path: '403', component: Page403Component, pathMatch: 'full'}, 
  {path: 'product/:id', component: SingleProductComponent, pathMatch: 'full'}, 
  {path: 'cart', component: CartComponent, pathMatch: 'full'},
  {path: 'checkout', component: CheckoutComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'manage-addresses', component: MobileShippingAddressComponent, pathMatch: 'full'},
  {path: 'select-address', component: MobileShippingAddressComponent, pathMatch: 'full'},
  {path: 'select-address-mobile', component: MobileSelectAddressComponent, pathMatch: 'full'},
  {path: 'add-shipping-address', component: AddShippingAddressComponent, pathMatch: 'full'},
  {path: 'update-shipping-address/:id', component: UpdateShippingAddressComponent, pathMatch: 'full'},
  {path: 'my-orders', component: MyOrdersComponent, pathMatch: 'full'},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
