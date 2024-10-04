import { Component, OnInit } from '@angular/core';
import { AddressService } from '../shared/address.service';
import { AddressDTO } from '../models/address';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent implements OnInit{
  addresses: AddressDTO[] = [];
  address: AddressDTO =  new AddressDTO();
  constructor(private addressService: AddressService) {

  }
  ngOnInit(): void {
    this.addressService.addresses.subscribe({
      next: (result: any)=> {
        this.addresses = this.address.addressesMapper(result?.data);
      }
    })
  }
}
