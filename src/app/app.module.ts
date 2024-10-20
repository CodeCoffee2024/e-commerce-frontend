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
import { UpdateShippingAddressComponent } from './update-shipping-address/update-shipping-address.component';
import { Page404Component } from './page404/page404.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { Page403Component } from './page403/page403.component';
import { MobileSelectAddressComponent } from './mobile-select-address/mobile-select-address.component';
import { DropdownFormAddress2Component } from './shared/dropdown-form-address2/dropdown-form-address2.component';
import { AddShippingAddressFormComponent } from './add-shipping-address/add-shipping-address-form/add-shipping-address-form.component';
import { ListShippingAddressComponent } from './shipping-address/list-shipping-address/list-shipping-address.component';
import { AddShippingAddressModalComponent } from './add-shipping-address/add-shipping-address-modal/add-shipping-address-modal.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { SharedModule } from './shared/shared/shared.module';

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
    DropdownFormComponent,
    UpdateShippingAddressComponent,
    Page404Component,
    ConfirmationDialogComponent,
    Page403Component,
    MobileSelectAddressComponent,
    DropdownFormAddress2Component,
    AddShippingAddressFormComponent,
    ListShippingAddressComponent,
    AddShippingAddressModalComponent,
    MyOrdersComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgbCarousel,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModalModule,
    SharedModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  entryComponents: [DockElementComponent],  // add to entryComponents for modals
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
