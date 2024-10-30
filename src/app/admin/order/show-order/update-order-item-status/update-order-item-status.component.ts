import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderDTO, OrderForm } from 'src/app/models/order';
import { OrderStatusType, OrderStatusTypeLabels } from 'src/app/models/orderStatusType';
import { AdminOrderService } from '../../admin-order.service';
import { LoadingService } from 'src/app/shared/loading.service';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-order-item-status.component.html',
  styleUrls: ['./update-order-item-status.component.css']
})
export class UpdateOrderItemStatusComponent implements OnInit {
  @Input() order: OrderForm;
  OrderStatusTypeLabels = OrderStatusTypeLabels;
  toggleCheckbox = false;
  constructor(
    private ngbActiveModal: NgbActiveModal,
    private orderService: AdminOrderService,
    private loadingService: LoadingService
  ) {

  }
  ngOnInit(): void {
  }
  toggleAll() {
    this.toggleCheckbox = !this.toggleCheckbox;
    
    this.order.items.forEach(item => {
      item.isSelected = this.toggleCheckbox;
    })
  }
  
  toggleItem() {
    this.toggleCheckbox = this.order.items.filter( it => it.isSelected).length == this.order.items.length;
  }
  submit () {
    this.loadingService.show();
    let payload = {status: this.order.nextStatusAction, items: this.order.selectedItems.map(it => it.id), id: this.order.id};
    let request = null;
    if (this.order.nextStatusAction == OrderStatusType.TOSHIP) {
      request = this.orderService.setAsToShip(payload);
    }
    if (this.order.nextStatusAction == OrderStatusType.FORDELIVERY) {
      request = this.orderService.setAsForDelivery(payload);
    }
    request.subscribe({
      next: (result: any) => {
        this.ngbActiveModal.close({success: true, result: result?.data});
      }, complete: () => {
        this.loadingService.hide();
      }
    })
  }
  close() {
    this.ngbActiveModal.close({success: false});
  }
}
