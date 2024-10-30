import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class MyOrdersService  extends ApiService {
  
  myOrders(params) {
    this.setAuthentication(localStorage.getItem('token'));
    this.setParameters(params, true);
    return this.getRequest('order/my-orders');
  }
}
