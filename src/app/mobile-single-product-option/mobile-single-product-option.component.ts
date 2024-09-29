import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-mobile-single-product-option',
  templateUrl: './mobile-single-product-option.component.html',
  styleUrls: ['./mobile-single-product-option.component.css']
})
export class MobileSingleProductOptionComponent {
  @Input() product: Product;
  quantity = 1;
  constructor(private cartService: CartService) {

  }
  addToCart(product: Product) {
    this.cartService.addItem(product, this.quantity);
  }
  buyNow(product: Product) {
    console.log("SD")
  }
  increment() {
    this.quantity ++;
  }
  decrement() {
    if (this.quantity < 2) {
      return;
    }
    this.quantity --;
  }
}
