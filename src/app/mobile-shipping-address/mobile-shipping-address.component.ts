import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-shipping-address',
  templateUrl: './mobile-shipping-address.component.html',
  styleUrls: ['./mobile-shipping-address.component.css']
})
export class MobileShippingAddressComponent {
  constructor(
    private router: Router
  ) {
    
  }
  addShippingAddress() {
    this.router.navigate(['add-shipping-address'])
  }
}
