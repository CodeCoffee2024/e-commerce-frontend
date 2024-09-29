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

const routes: Routes = [
  {path: 'home', component: HomeComponent, pathMatch: 'full'}, 
  {path: '', component: DashboardComponent, pathMatch: 'full'}, 
  {path: 'product/:id', component: SingleProductComponent, pathMatch: 'full'}, 
  {path: 'cart', component: CartComponent, pathMatch: 'full'},
  {path: 'checkout', component: CheckoutComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'manage-addresses', component: MobileShippingAddressComponent, pathMatch: 'full'},
  {path: 'add-shipping-address', component: AddShippingAddressComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
