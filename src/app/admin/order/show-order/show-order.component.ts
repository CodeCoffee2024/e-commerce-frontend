import { Component, OnInit } from '@angular/core';
import { AdminOrderService } from '../admin-order.service';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDTO, OrderForm } from 'src/app/models/order';
import { LoadingService } from 'src/app/shared/loading.service';
import { AuthService } from 'src/app/shared/auth.service';
import { CartDTO } from 'src/app/models/cart';
import { Merchant, MerchantDTO } from 'src/app/models/merchant';
import { OrderStatusType, OrderStatusTypeLabels } from 'src/app/models/orderStatusType';
import { NotificationService } from 'src/app/notification/notification.service';
import { NotificationType } from 'src/app/models/notification';
import { UpdateOrderItemStatusComponent } from './update-order-item-status/update-order-item-status.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DockElementComponent } from 'src/app/dock-element/dock-element.component';

@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.css']
})
export class ShowOrderComponent implements OnInit {
  order: OrderDTO = new OrderDTO();
  cart: CartDTO = new CartDTO();
  isLoading = false;
  selectedStatus: OrderStatusType = OrderStatusType.ALL;
  OrderStatusType = OrderStatusType;
  OrderStatusTypeLabels = OrderStatusTypeLabels;
  constructor(
    private orderService: AdminOrderService,
    public dashboardService: DashboardService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private authService: AuthService,
    private modalService: NgbModal,
    private notificationService: NotificationService
  ) {
    
  }
  ngOnInit(): void {
    let orderId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.isLoading = true;
    this.loadingService.show();
    if (!this.authService.verifyAuth(true)) {
      this.loadingService.hide();
      this.route.navigate(['403']);
      return;
    }
    this.loadOrders(this.selectedStatus, orderId);
  }
  loadOrders(orderStatus: OrderStatusType = null, id = null) {
    let params = {status: orderStatus}
    this.orderService.show(this.order?.id ?? id, params).subscribe({
      next: (result: any) => {
        if (!result) {
          this.order.items = [];
        }
        let order = new OrderDTO();
        if (!id) {
          order = order.orderMapper(result?.data);
          this.order.items = order.items ?? [];
          return;
        }
        this.order = order.orderMapper(result?.data);
      }, complete: () => {
        this.loadingService.hide();
        this.isLoading = false;
      }
    })
  }
  updateSelectedStatus (selectedStatus) {
    this.selectedStatus = selectedStatus;
    this.loadingService.show();
    this.loadOrders(this.selectedStatus);
  }
  orderItemsStatusUpdate (status: OrderStatusType) {
    const modalRef = this.modalService.open(UpdateOrderItemStatusComponent, { 
      backdrop: 'static',  
      keyboard: false,
      animation: false
    });
    let orderForm = new OrderForm();
    orderForm.fill(this.order);
    orderForm.nextStatus = status;
    orderForm.items = orderForm.items.filter(it=>it.status == status);
    modalRef.componentInstance.order = orderForm;
    modalRef.result.then((result) => {
      if (result?.success) {
        this.order = result?.result;
        console.log(this.order);
        this.notificationService.openModal({
          type: NotificationType.STATUSCHANGE,
          message: "Status updated successfully",
          header: null,
          timer: 2000})
      }
    }).catch((error) => {
      console.error('Modal dismissed with error:', error);
      this.loadingService.hide();
    });
  }
  get statusBackground() {
    switch (this.order.status) {
      case OrderStatusTypeLabels[OrderStatusType.TOSHIP]:
        return 'btn-info';
      case OrderStatusTypeLabels[OrderStatusType.FORDELIVERY]:
        return 'btn-warning';
      case OrderStatusTypeLabels[OrderStatusType.RECEIVED]:
        return 'btn-success';
      default: 
        return 'btn-secondary';
    }
  }
  merchantShippingFee(merchant: MerchantDTO) {
    return Number(this.order.shippingMerchant.find(it=> it.merchant.id == merchant.id)?.shippingFee);
  }
  get merchants() {
    let cart = this.order.items;
    const merchants = cart.map(it => it).sort((a,b)=> a.id.valueOf() - b.id.valueOf())
      .map(item => item.product.merchant) // Assuming product has a merchant field
      .filter((merchant, index, self) => self.findIndex(m => m.id === merchant.id) === index);
    return merchants;
  }
  getMerchantItems(merchant: MerchantDTO) {
    return this.order.items.filter(it=>it.product.merchant.id == merchant.id);
  }
}
