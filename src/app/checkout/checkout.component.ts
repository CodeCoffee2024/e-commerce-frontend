import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart';
import { CartService } from '../cart/cart.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification/notification.service';
import { Merchant } from '../models/merchant';
import { LoadingService } from '../shared/loading.service';
import { AuthService } from '../shared/auth.service';
import { AddressService } from '../shared/address.service';
import { AddressDTO } from '../models/address';
import { AddressForm } from '../form/address.form';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  carts: Cart[];
  totalCartItems = 0;
  defaultAddress: AddressForm = new AddressForm();

  constructor(
    private cartService: CartService,
    public dashboardService: DashboardService,
    private router: Router,
    private addressService: AddressService,
    private authService: AuthService,
    private loadingService: LoadingService
  ){}
  ngOnInit(): void {
    this.loadingService.show();
    if (!this.authService.verifyAuth()) {
      this.loadingService.hide();
      this.router.navigate(['403']);
      return;
    }
    console.log(localStorage.getItem('selectedAddress'));
    if (localStorage.getItem('selectedAddress')) {
      let param = {id: localStorage.getItem('selectedAddress')}
      this.addressService.getAddress(param).subscribe({
        next: (data : any) => {
          this.defaultAddress = this.defaultAddress.format(data?.data as AddressForm);
        }, complete: () => {
          this.loadingService.hide();
        }
      })
    } else {
      this.addressService.defaultDeliveryAddress.subscribe({
        next: (data : any) => {
          this.defaultAddress = this.defaultAddress.format(data?.data as AddressForm);
        }, complete: () => {
          this.loadingService.hide();
        }
      })
    }
  }
  selectAddress() {
    this.router.navigate(['select-address'], { queryParams: { selectAddress: true } });
  }
  
  get merchants() {
    return this.cartService.getUniqueMerchants();
  }
  merchantCartItems(merchant: Merchant): Cart[] {
    return this.cartService.getItemsOfMerchant(merchant);
  }
  get isMobile() {
    return window.innerWidth <= 768;
  }
  goToShippingAddresses() {
    this.router.navigate(['manage-addresses']);
  }
  placeOrder() {
    
  }
}
