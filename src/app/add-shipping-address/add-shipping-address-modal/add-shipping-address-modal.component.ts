import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-shipping-address-modal',
  templateUrl: './add-shipping-address-modal.component.html',
  styleUrls: ['./add-shipping-address-modal.component.css']
})
export class AddShippingAddressModalComponent implements OnInit{
  @Input() data: any;
  reloadAfterSave : boolean;
  constructor(private activeModal: NgbActiveModal){}
  ngOnInit(): void {
    this.reloadAfterSave = this.data?.reloadAfterSave;
  }
  hasNewDefaultAddress(event) {
    this.activeModal.close({newDefaultAddress:event})
  }
}
