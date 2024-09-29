import { Component } from '@angular/core';
import { Cart } from '../models/cart';
import { CartService } from '../cart/cart.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification/notification.service';
import { Merchant } from '../models/merchant';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  carts: Cart[];
  totalCartItems = 0;

  constructor(
    private cartService: CartService,
    public dashboardService: DashboardService,
    private router: Router,
    private notificationService: NotificationService
  ) {
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
}
