import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends ApiService {

  regions(params) {
    this.setAuthentication(localStorage.getItem('token'));
    this.setParameters(params, true);
    return this.getRequest('address/regions');
  }
  createOrUpdate(payload) {
    this.setAuthentication(localStorage.getItem('token'));
    return this.postRequest('address/createOrUpdate', payload);
  }
  provinces(params) {
    this.setAuthentication(localStorage.getItem('token'));
    this.setParameters(params, true);
    return this.getRequest('address/provinces');
  }
  cityMunicipalities(params) {
    this.setAuthentication(localStorage.getItem('token'));
    this.setParameters(params, true);
    return this.getRequest('address/cityMunicipalities');
  }
  barangays(params) {
    this.setParameters(params, true);
    this.setAuthentication(localStorage.getItem('token'));
    return this.getRequest('address/barangays');
  }
}
