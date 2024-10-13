import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressForm } from 'src/app/form/address.form';
import { AddressDTO } from 'src/app/models/address';

@Component({
  selector: 'app-list-shipping-address',
  templateUrl: './list-shipping-address.component.html',
  styleUrls: ['./list-shipping-address.component.css']
})
export class ListShippingAddressComponent implements OnInit{
  @Input() data: any;
  addresses: AddressForm [] = [];
  constructor(private activeModal: NgbActiveModal) {

  }
  ngOnInit(): void {
    if (this.data?.addresses) {
      this.addresses = this.data?.addresses;
      console.log(this.addresses);
    }
  }
  selectAddress() {

  }
  addNewAddress() {
    this.activeModal.close('newAddress');
  }
  updateSelected(address: AddressForm) {
    this.addresses.forEach(addressItem=>{
      addressItem.isSelected = address.id == addressItem.id;
    })
    localStorage.setItem('selectedAddress', address.id.toString());
  }
  save() {
    this.activeModal.close('updatedAddress');
  }
  cancel() {
    this.activeModal.close();
  }
}
