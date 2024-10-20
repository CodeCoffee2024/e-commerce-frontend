import { Component, OnInit } from '@angular/core';
import { AdminOrderService } from './admin-order.service';
import { OrderListingOption } from './order-listing-option';
import { OrderDTO } from 'src/app/models/order';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  searchText: string;
  isLoading = false;
  order: OrderDTO = new OrderDTO();
  orders: OrderDTO[] = [];
  currentPage: Number;
  totalPages: Number;
  listingOption: OrderListingOption = new OrderListingOption();
  constructor(
    private orderService: AdminOrderService,
    public dashboardService: DashboardService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.isLoading = true;
    this.listingOption.searchText = this.activatedRoute.snapshot.queryParams["search"];
    this.listingOption.sortBy = this.activatedRoute.snapshot.queryParams["sortBy"];
    this.listingOption.page = this.activatedRoute.snapshot.queryParams["page"];
    this.loadContent();
  }
  async navigate(page) {
    this.listingOption.page = page;
    this.loadContent();
  }
  loadContent() {
    this.route.navigate([], {
      queryParams: {
        page: this.listingOption.page,
        search: this.listingOption.searchText,
        sortBy: this.listingOption.sortBy,
        // ...this.additionalParams
      },
      queryParamsHandling: 'merge',
    });
    this.isLoading = true;
    this.orderService.orders(this.listingOption).subscribe ({
      next: (result: any) => {
        this.orders = this.order.ordersMapper(result?.result)
        this.totalPages = result?.pageCount;
        this.currentPage = result?.page;
      }, complete: () => {
        this.isLoading = false;
      }
    })
  }
  showOrder(orderId) {
    this.route.navigate([`admin/order/`,orderId]);
  }
}
