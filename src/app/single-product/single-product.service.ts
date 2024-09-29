import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class SingleProductService extends ApiService {
  getProduct(id: Number) {
    let request = this.getRequest('product/'+id);
    return request;
  }
}
