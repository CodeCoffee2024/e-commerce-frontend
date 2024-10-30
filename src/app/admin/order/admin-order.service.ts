import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService extends ApiService {
  orders(payload) {
    this.setAuthentication(localStorage.getItem('token'));
    return this.postRequest('order/list', payload);
  }
  users(customers) {
    this.setAuthentication(localStorage.getItem('token'));
    return this.postRequest('order/customerList', customers);
  }
  setAsToShip(payload) {
    this.setAuthentication(localStorage.getItem('token'));
    return this.putRequest('order/setAsToShip', payload);
  }
  receiveOrder(id:Number) {
    this.setAuthentication(localStorage.getItem('token'));
    return this.putRequest('order/receive-item', {id: id});
  }
  setAsForDelivery(payload) {
    this.setAuthentication(localStorage.getItem('token'));
    return this.putRequest('order/setAsForDelivery', payload);
  }
  shipTos(shipTos) {
    this.setAuthentication(localStorage.getItem('token'));
    return this.postRequest('order/shipToList', shipTos);
  }
  show(orderId, params) {
    this.setAuthentication(localStorage.getItem('token'));
    this.setParameters(params, true);
    return this.getRequest('order/' + orderId);
  }
}
