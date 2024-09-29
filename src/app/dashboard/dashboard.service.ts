import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends ApiService{

  getAllProducts () {
    let request = this.getRequest('products/');
    return request;
  }
  getAllCategories () {
    let request = this.getRequest('categories/');
    return request;
  }
}
