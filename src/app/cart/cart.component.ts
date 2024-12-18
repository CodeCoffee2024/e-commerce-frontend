import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart';
import { CartService } from './cart.service';
import { Merchant } from '../models/merchant';
import { Product } from '../models/product';
import { DashboardService } from '../dashboard/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from '../models/notification';
import { LoadingService } from '../shared/loading.service';
import { AuthService } from '../shared/auth.service';
import { AddressForm } from '../form/address.form';
import { AddressService } from '../shared/address.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts: Cart[];
  quantity: Number = 0;
  isLoading = false;
  defaultAddress: AddressForm = new AddressForm();
  totalCartItems = 0;
  constructor(
    private cartService: CartService,
    public dashboardService: DashboardService,
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private addressService: AddressService
  ){}
  ngOnInit(): void {
    this.loadingService.show();
    if (!this.authService.verifyAuth()) {
      this.loadingService.hide();
      this.router.navigate(['403']);
      return;
    }
    this.cartService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
      if (this.isLoading) {
        this.loadingService.show();
      } else {
        this.loadingService.hide();
      }
    });
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
        }
      })
    }
  }

  get merchants() {
    return this.cartService.getUniqueMerchants();
  }
  merchantCartItems(merchant: Merchant): Cart[] {
    return this.cartService.getItemsOfMerchant(merchant);
  }
  checkSelectedMerchantItems(merchant) {
    return this.cartService.getItemsOfMerchant(merchant).length == this.cartService.getItemsOfMerchant(merchant).filter(it=> it.isSelected).length
    && this.cartService.getItemsOfMerchant(merchant).filter(it=> it.isSelected).length > 0;
  }
  toggleItems (merchant: Merchant) {
    let merchantItems =[];
    this.cartService.getItemsOfMerchant(merchant).forEach(product => {
      product.isSelected = !this.checkSelectedMerchantItems(merchant);
      merchantItems = [...merchantItems, product];
    });
    this.cartService.updateMerchantItems(merchant, merchantItems);
  }
  toggleCartItem(cartItem: Cart) 
  {
    cartItem.isSelected = !cartItem.isSelected;
    this.cartService.updateItem(cartItem);
  }
  isAllToggled() {
    return this.cartService.getTotalCountOfSelectedItems() == this.cartService.getTotalCountItems()
    && this.cartService.getTotalCountOfSelectedItems() > 0;
  }
  toggleAll(event) {
    let updatedCart =[];
    this.cartService.getAllItems().forEach(cartItem => {
      cartItem.isSelected = event.target.checked 
      updatedCart = [...updatedCart, cartItem];
    });
    this.cartService.updateCart(updatedCart);
  } 
  deleteSelectedItems() {
    this.cartService.removeSelectedItems();
  }
  calculateSelectedItems() {
    return this.cartService.getSelectedCartItemsTotal();
  }
  getSelectedItemsCount() {
    return this.cartService.getSelectedItemsCount();
  }
  calculateSubtotal() {
    return this.getSelectedItemsCount() > 0 ? this.cartService.getSelectedCartItemsTotal() + 100 : 0;
  }
  increment(product: Product) {
    this.cartService.updateProductQuantity(product, this.getCartItemQuantity(product) + 1);
  }

  decrement(product: Product) {
    if (this.getCartItemQuantity(product) > 1) {
      this.cartService.updateProductQuantity(product, this.getCartItemQuantity(product) - 1);
    } else {
      
    }
  }

  updateProductQuantity(cartItem:Cart) {
    if (!this.isLoading) {
      this.cartService.updateCartItem(cartItem);
    }
  }

  getCartItemQuantity(product: Product) {
    return Number(this.cartService.getCartProduct(product).quantity);
  }
  goToCheckout(){
    if(this.getSelectedItemsCount() == 0) {
      this.notificationService.openModal({
        type: NotificationType.NOITEMSELECTED,
        message: "No product was selected",
        header: null,
        timer: 3000})
        return;
    }
    localStorage.removeItem('selectedAddress');
    this.router.navigate(['checkout']);
  }
}
