import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbCarousel, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SingleProductComponent } from './single-product/single-product.component';
import { DockElementComponent } from './dock-element/dock-element.component';
import { MobileSingleProductSpecificationComponent } from './mobile-single-product-specification/mobile-single-product-specification.component';
import { MobileSingleProductOptionComponent } from './mobile-single-product-option/mobile-single-product-option.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { NotificationComponent } from './notification/notification.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { firebaseConfig } from 'src/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LoginComponent } from './login/login.component';
import { MobileLoginComponent } from './mobile-login/mobile-login.component';
import { UserComponent } from './user/user.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { MobileShippingAddressComponent } from './mobile-shipping-address/mobile-shipping-address.component';
import { AddShippingAddressComponent } from './add-shipping-address/add-shipping-address.component';
import { DropdownFormComponent } from './shared/dropdown-form/dropdown-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    SingleProductComponent,
    MobileSingleProductSpecificationComponent,
    DockElementComponent,
    MobileSingleProductOptionComponent,
    CartComponent,
    NotificationComponent,
    CheckoutComponent,
    LoginComponent,
    MobileLoginComponent,
    UserComponent,
    LoadingComponent,
    ShippingAddressComponent,
    MobileShippingAddressComponent,
    AddShippingAddressComponent,
    DropdownFormComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgbCarousel,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModalModule,

    AngularFireModule.initializeApp(firebaseConfig),
  ],
  entryComponents: [DockElementComponent],  // add to entryComponents for modals
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
