import { Component } from '@angular/core';
import { OrderStatusType, OrderStatusTypeLabels } from '../models/orderStatusType';
import { DashboardService } from '../dashboard/dashboard.service';
import { Router } from '@angular/router';
import { AddressService } from '../shared/address.service';
import { AuthService } from '../shared/auth.service';
import { LoadingService } from '../shared/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../notification/notification.service';
import { CheckoutService } from '../checkout/checkout.service';
import { MyOrdersService } from './my-orders.service';
import { Order, OrderDTO, OrderItemDTO } from '../models/order';
import { Merchant } from '../models/merchant';
import { AdminOrderService } from '../admin/order/admin-order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  searchText: string;
  selectedStatus: OrderStatusType = OrderStatusType.ALL;
  OrderStatusType = OrderStatusType;
  OrderStatusTypeLabels = OrderStatusTypeLabels;
  isLoading = true;
  order: OrderDTO = new OrderDTO();
  orders: OrderDTO[] = [];
  ordermapper: OrderDTO = new OrderDTO();
  constructor(
    public dashboardService: DashboardService,
    private router: Router,
    private addressService: AddressService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private modalService: NgbModal,
    private notificationService: NotificationService,
    private orderService: MyOrdersService,
    private adminOrderService: AdminOrderService
  ){}
  ngOnInit(): void {
    this.isLoading = true;
    this.loadingService.show();
    if (!this.authService.verifyAuth()) {
      this.loadingService.hide();
      this.router.navigate(['403']);
      return;
    }
    this.loadOrders()
  }
  cartContent(order: OrderDTO) {
      return order.items;
  }
  merchants(order: OrderDTO) {
    if (!this.cartContent(order)) {
      return  [];
    }
    const merchants = this.cartContent(order).map(it => it).sort((a,b)=> a.id.valueOf() - b.id.valueOf())
    .map(item => item.product.merchant) // Assuming product has a merchant field
    .filter((merchant, index, self) => self.findIndex(m => m.id === merchant.id) === index); // Remove duplicates based on merchant id

    return merchants;
  }
  loadOrders(orderStatus: OrderStatusType = null) {
    let params = {status: orderStatus}
    this.orderService.myOrders(params).subscribe({
      next: (result: any) => {
        this.orders = this.ordermapper.ordersMapper(result?.data);
      }, complete: ()=>{
        this.isLoading = false;
        this.loadingService.hide();
      }
    })
  }
  merchantItemsTotal(merchant: Merchant, order: OrderDTO) {
    return this.getItemsOfMerchant(merchant, order).reduce((runningTotal, item) => {
      runningTotal.total += item.product.price * Number(item.quantity);
      return runningTotal;  // Return the updated runningTotal object
    }, { total: 0 });  // Initialize runningTotal as an object with a 'total' property set to 0
  }
  receiveOrder(orderItem: OrderItemDTO) {
    this.loadingService.show();
    this.adminOrderService.receiveOrder(orderItem.id).subscribe({
      next: () => {
        this.loadOrders(this.selectedStatus);
      }
    })
  }
  getItemsOfMerchant(merchant: Merchant, order: OrderDTO) {
    const currentItems = this.cartContent(order);
    return currentItems.filter(it=>it.product.merchant.id == merchant.id);
  }
  get isMobile() {
    return window.innerWidth < 1024;
  }
  updateSelectedStatus (selectedStatus) {
    this.selectedStatus = selectedStatus;
    this.loadingService.show();
    this.loadOrders(this.selectedStatus);
  }
}
