import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService extends ApiService{

  checkout(payload) {
    this.setAuthentication(localStorage.getItem('token'));
    return this.postRequest('order/create', payload);
  }
}
