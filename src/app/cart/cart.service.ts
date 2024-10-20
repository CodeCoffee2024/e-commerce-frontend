import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { Cart } from '../models/cart';
import { Merchant } from '../models/merchant';
import { Mapper } from '../shared/mapper';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService extends ApiService {
  private cartItemsSubject = new BehaviorSubject<Cart[]>([]);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  cartItems$ = this.cartItemsSubject.asObservable();
  private setLoading(value: boolean) {
    this.isLoadingSubject.next(value);
  }

  addItem(product: any, quantity: Number, isSelected = false) {
    const currentItems = this.cartItemsSubject.value;
    let isExisting = currentItems.find(it => it.product.id == product.id);
    if (isExisting) {
      quantity = Number(currentItems.find(it => it.product.id == product.id).quantity) + Number(quantity);
    }
    let payload = {
      product: product,
      quantity: quantity,
      isSelected: isSelected
    }
    this.setAuthentication(localStorage.getItem('token'));
    this.postRequest('cart/createOrUpdateCartItem', payload).subscribe(updatedCart=> {
      const cartItems = JSON.parse(updatedCart["cart"] as string);
      this.cartItemsSubject.next(cartItems as Cart[]);

    });

  }

  removeItem(itemId: number) {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    this.cartItemsSubject.next(updatedItems);
  }

  clearCart() {
    this.cartItemsSubject.next([]);
  }

  getTotalCountItems() {
    const currentItems = this.cartItemsSubject.value;
    return currentItems.length;
  }
  getTotalCountOfSelectedItems() {
    const currentItems = this.cartItemsSubject.value;
    return currentItems.filter(it=>it.isSelected).length;
  }
  getItemsOfMerchant(merchant: Merchant) {
    const currentItems = this.cartItemsSubject.value;
    return currentItems.filter(it=>it.product.merchant.id == merchant.id);
  }
  getAllItems() {
    const currentItems = this.cartItemsSubject.value;
    return currentItems;
  }
  removeSelectedItems() {
    const currentItems = this.cartItemsSubject.value;
    let updatedCart = [];
    currentItems.filter(it => !it.isSelected).forEach(item => {
      updatedCart = [...updatedCart, item];
    })
    this.updateCart(updatedCart);
  }
  getSelectedCartItemsTotal() {
    const currentItems = this.cartItemsSubject.value;
    return currentItems.filter(it => it.isSelected).reduce((acc, item) => Number(acc.valueOf()) + (Number(item.product.price.valueOf() * Number(item.quantity))), 0);
  }
  getSelectedItemsCount() {
    const currentItems = this.cartItemsSubject.value;
    return currentItems.filter(it => it.isSelected).length;
  }
  updateCart(cart) {
    let payload = {
      'content': JSON.stringify(cart)
    }
    this.setLoading(true); // Set loading to true before the request starts
    localStorage.setItem('cart', JSON.stringify(cart));
    this.setAuthentication(localStorage.getItem('token'));
    this.patchRequest('cart/updateCart', payload).subscribe({
      next: (updatedCart) => {
        const cartItems = JSON.parse(updatedCart as string);
        this.cartItemsSubject.next(cartItems as Cart[]);
      },
      error: (err) => {
        if (err?.status === 401) {
          localStorage.removeItem('authValidUntil');
          localStorage.removeItem('auth');
          localStorage.removeItem('cart');
          localStorage.removeItem('displayName');
          localStorage.removeItem('token');
          this.cartItemsSubject.next([] as Cart[]);
        }
      },
      complete: () => {
        this.setLoading(false); // Set loading to true before the request starts
      }
    });
  }
  updateMerchantItems(merchant, items) {
    const currentItems = this.cartItemsSubject.value;
    const updatedCart = currentItems.map(it => 
      it.product.merchant.id === merchant.id 
        ? items.find(updatedItem => updatedItem.product.id === it.product.id) || it 
        : it
    );
    this.updateCart(updatedCart);
  }
  updateItem(item) {
    const currentItems = this.cartItemsSubject.value;
    const updatedCart = currentItems.map(it => 
      it.product.id === item.product.id ? item: it
    );
    this.updateCart(updatedCart);
  }
  getTotalPrice() { 
    const currentItems = this.cartItemsSubject.value;
    return currentItems.reduce((acc, item) => acc + item.product.price * Number(item.quantity), 0);
  }
  // New method to get unique merchants from the cart items
  getUniqueMerchants() {
    const currentItems = this.cartItemsSubject.value;
    const merchants = currentItems.map(it => it).sort((a,b)=> new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
      .map(item => item.product.merchant) // Assuming product has a merchant field
      .filter((merchant, index, self) => self.findIndex(m => m.id === merchant.id) === index); // Remove duplicates based on merchant id

    return merchants;
  }
  updateProductQuantity(product: Product, quantity: Number) {
    const currentItems = this.cartItemsSubject.value;
    let itemToUpdate = currentItems.find((item: any) => item.product.id === product.id);
    if (itemToUpdate) {
      itemToUpdate.quantity = quantity;
      this.updateCart(currentItems);
    }
  }
  updateCartItem(cartItem: Cart) {
    const currentItems = this.cartItemsSubject.value;
    let itemToUpdate = currentItems.find((item: any) => item.product.id === cartItem.product.id);
    if (itemToUpdate) {
      itemToUpdate.quantity = cartItem.quantity;
      this.updateCart(currentItems);
    }
  }
  getCartProduct(product: Product) {
    const currentItems = this.cartItemsSubject.value;
    return currentItems.find(it=>it.product.id == product.id);
  }
  async getCart(): Promise<any> {
    this.setAuthentication(localStorage.getItem('token'));
    this.setLoading(true);
    return this.getRequest('cart').subscribe({
      next: (updatedCart)=> {
        const cartItems = JSON.parse(updatedCart as string);
        this.cartItemsSubject.next(cartItems as Cart[]);
      }, complete: () => {
        this.setLoading(false);
      }
    });
  }
  loadCart(data) {
    if(data?.user?.cart) {
      const cartItems = JSON.parse(data.user.cart.content as string);
      this.cartItemsSubject.next(cartItems as Cart[]);
    }
  }
}
