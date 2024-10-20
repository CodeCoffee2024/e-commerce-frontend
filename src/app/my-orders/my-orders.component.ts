import { Component } from '@angular/core';
import { OrderStatusType } from '../models/orderStatusType';
import { DashboardService } from '../dashboard/dashboard.service';
import { Router } from '@angular/router';
import { AddressService } from '../shared/address.service';
import { AuthService } from '../shared/auth.service';
import { LoadingService } from '../shared/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../notification/notification.service';
import { CheckoutService } from '../checkout/checkout.service';
import { MyOrdersService } from './my-orders.service';
import { Order, OrderDTO } from '../models/order';
import { Merchant } from '../models/merchant';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  searchText: string;
  selectedStatus: OrderStatusType = OrderStatusType.ALL;
  OrderStatusType = OrderStatusType;
  isLoading = true;
  order: OrderDTO = new OrderDTO();
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
    private checkoutService: CheckoutService
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
  get cartContent() {
      return this.order?.cart;
  }
  get merchants() {
    if (!this.cartContent) {
      return  [];
    }
    const merchants = this.cartContent.map(it => it).sort((a,b)=> new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
    .map(item => item.product.merchant) // Assuming product has a merchant field
    .filter((merchant, index, self) => self.findIndex(m => m.id === merchant.id) === index); // Remove duplicates based on merchant id

    return merchants;
  }
  loadOrders(orderStatus: OrderStatusType = null) {
    let params = {status: orderStatus}
    this.orderService.myOrders(params).subscribe({
      next: (result: any) => {
        this.order = this.ordermapper.orderMapper(result?.data)[0];
      }, complete: ()=>{
        this.isLoading = false;
        this.loadingService.hide();
      }
    })
  }
  merchantItemsTotal(merchant: Merchant) {
    return this.getItemsOfMerchant(merchant).reduce((runningTotal, item) => {
      runningTotal.total += item.product.price * Number(item.quantity);
      return runningTotal;  // Return the updated runningTotal object
    }, { total: 0 });  // Initialize runningTotal as an object with a 'total' property set to 0
  }
  getItemsOfMerchant(merchant: Merchant) {
    const currentItems = this.cartContent;
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
