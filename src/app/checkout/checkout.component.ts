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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddShippingAddressComponent } from '../add-shipping-address/add-shipping-address.component';
import { ListShippingAddressComponent } from '../shipping-address/list-shipping-address/list-shipping-address.component';
import { isEmpty } from 'rxjs';
import { AddShippingAddressFormComponent } from '../add-shipping-address/add-shipping-address-form/add-shipping-address-form.component';
import { AddShippingAddressModalComponent } from '../add-shipping-address/add-shipping-address-modal/add-shipping-address-modal.component';
import { PaymentOption } from '../models/paymentOption';
import { NotificationType } from '../models/notification';
import { CheckoutService } from './checkout.service';
import { CheckoutDTO, CheckoutForm } from '../models/checkout';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  carts: Cart[];
  totalCartItems = 0;
  defaultAddress: AddressForm = new AddressForm();
  isLoading = true;
  checkoutForm = new CheckoutForm();
  PaymentOption = PaymentOption;
  selectedPaymentOption: string;
  paymentOptionError: string;
  constructor(
    private cartService: CartService,
    public dashboardService: DashboardService,
    private router: Router,
    private addressService: AddressService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private modalService: NgbModal,
    private notificationService: NotificationService,
    private checkoutService: CheckoutService
  ){}
  ngOnInit(): void {
    this.isLoading = true;
    this.loadingService.show();
    if (!this.authService.verifyAuth()) {
      this.loadingService.hide();
      this.router.navigate(['403']);
      return;
    }
    this.loadDefaultAddress();
  }
  loadDefaultAddress() {
    
    if (localStorage.getItem('selectedAddress')) {
      let param = {id: localStorage.getItem('selectedAddress')}
      this.addressService.getAddress(param).subscribe({
        next: (data : any) => {
          if (data?.data) {
            this.defaultAddress = this.defaultAddress.format(data?.data as AddressForm);
          }
        }, complete: () => {
          this.loadingService.hide();
          this.isLoading = false;
        }
      })
    } else {
      this.addressService.defaultDeliveryAddress.subscribe({
        next: (data : any) => {
          if (data?.data) {
            this.defaultAddress = this.defaultAddress.format(data?.data as AddressForm);
            localStorage.setItem('selectedAddress', this.defaultAddress.id.toString());
          }
        }, complete: () => {
          this.loadingService.hide();
          this.isLoading = false;
        }
      })
    }
  }
  selectAddress() {
    if (window.innerWidth < 1024) {
      this.router.navigate(['select-address'], { queryParams: { selectAddress: true } });
    }
  }
  
  get merchants() {
    return this.cartService.getUniqueMerchants();
  }
  merchantCartItems(merchant: Merchant): Cart[] {
    return this.cartService.getItemsOfMerchant(merchant).filter(it=>it.isSelected);
  }
  get isMobile() {
    return window.innerWidth <= 768;
  }
  calculateSelectedItems() {
    return this.cartService.getSelectedCartItemsTotal();
  }
  calculateShipping() {
    return this.cartService.getSelectedCartItemsTotal();
  }
  calculateGrandTotal() {
    return this.calculateSelectedItems() + this.calculateShipping();
  }
  updateDefaultAddress() {
    if (window.innerWidth > 1023) {
      this.loadingService.show();
      this.addressService.addresses.subscribe({
        next: (result : any) => {
          const modalRef = this.modalService.open(ListShippingAddressComponent, { 
            backdrop: 'static',  // Optional: Prevent closing by clicking outside
            keyboard: false,      // Optional: Prevent closing by ESC key });
            animation: false,
            size: 'md'
          });
          let addresses: AddressForm [] = [];
          result?.data.forEach(item => {
            let address = new AddressForm();
            address.format(item);
            address.isSelected = JSON.parse(localStorage.getItem('selectedAddress')) == address.id;
            addresses.push(address);
          });
          modalRef.componentInstance.data = {
            addresses: addresses
          };
          modalRef.result.then((result) => {
            if (result == 'newAddress') {
              const modalRef = this.modalService.open(AddShippingAddressModalComponent, { 
                backdrop: 'static',
                keyboard: false,
                animation: false,
                size: 'md'
              });
              modalRef.componentInstance.data = {
                reloadAfterSave: false
              };
              modalRef.result.then((result) => {
                if (result?.newDefaultAddress) {
                  this.loadingService.show();
                  localStorage.setItem('selectedAddress', result?.newDefaultAddress);
                  this.loadDefaultAddress();
                }
              });
            } else if (result == 'updatedAddress') {
              this.loadingService.show();
              this.loadDefaultAddress();
            }
          });
        },
        complete: () => {
          this.loadingService.hide();
        }
      })
    }
  }
  goToShippingAddresses() {
    this.router.navigate(['manage-addresses']);
  }
  updatePaymentOption(paymentOption: string) {
    this.selectedPaymentOption = paymentOption;
  }
  placeOrder() {
    if (!this.selectedPaymentOption) {
      this.paymentOptionError = 'No payment option selected';
      return;
    }
    this.loadingService.show();
    this.paymentOptionError = null;
    let cartItems = [];
    this.merchants.forEach(merchant => {
      this.merchantCartItems(merchant).forEach(cart => {
        cartItems = [...cartItems, cart];
      })
    });
    let data = {
      paymentOption: this.selectedPaymentOption,
      cartItems: cartItems,
      shippingAddress: this.defaultAddress
    }
    this.checkoutForm.format(data);
    console.log(this.checkoutForm);
    this.checkoutService.checkout(this.checkoutForm).subscribe({
      next: (result: any) => {
        
      }, complete: () => {
        this.loadingService.hide();
      }
    });
  }
}
