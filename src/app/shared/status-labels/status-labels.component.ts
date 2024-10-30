import { Component, Input } from '@angular/core';
import { OrderStatusType, OrderStatusTypeLabels } from 'src/app/models/orderStatusType';
import { PaymentOption } from 'src/app/models/paymentOption';

@Component({
  selector: 'status-labels',
  templateUrl: './status-labels.component.html',
  styleUrls: ['./status-labels.component.css']
})
export class StatusLabelsComponent {
  @Input() type: string;
  get status() {
    return this.type;
  }
  get class() {
    switch(this.status) {
      case OrderStatusTypeLabels[OrderStatusType.TOSHIP]:
        return 'badge badge-info font-sm';
      case OrderStatusTypeLabels[OrderStatusType.FORDELIVERY]:
        return 'badge badge-warning font-sm';
      case OrderStatusTypeLabels[OrderStatusType.RECEIVED]:
        return 'badge badge-success font-sm';
      default: 
        return 'badge badge-secondary font-sm';
    }
  }
}
