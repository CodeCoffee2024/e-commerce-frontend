import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService extends ApiService {
  orders(params) {
    this.setAuthentication(localStorage.getItem('token'));
    this.setParameters(params, true);
    return this.getRequest('order/list');
  }
}
