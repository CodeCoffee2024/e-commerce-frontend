import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends ApiService {
  getAddress(params) {
    this.setAuthentication(localStorage.getItem('token'));
    this.setParameters(params, true);
    return this.getRequest('address');
  }
  get defaultDeliveryAddress() {
    this.setAuthentication(localStorage.getItem('token'));
    return this.getRequest('address/defaultDeliveryAddress');
  }
  delete(params) {
    this.setAuthentication(localStorage.getItem('token'));  
    this.setParameters(params, true);
    return this.deleteRequest('address');
  }
  get addresses() {
    this.setAuthentication(localStorage.getItem('token'));  
    return this.getRequest('address/getAll');
  }
  regions(params) {
    this.setAuthentication(localStorage.getItem('token'));
    this.setParameters(params, true);
    return this.getRequest('address/regions');
  }
  allRegions() {
    return this.getRequest('region/all');
  }
  allProvinces(params) {
    this.setAuthentication(localStorage.getItem('token'));
    this.setParameters(params, true);
    return this.getRequest('province/all');
  }
  allCityMunicipalities(params) {
    this.setAuthentication(localStorage.getItem('token'));
    this.setParameters(params, true);
    return this.getRequest('cityMunicipality/all');
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
