import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AdminOrderService } from './admin-order.service';
import { OrderListingOption } from './order-listing-option';
import { OrderDTO } from 'src/app/models/order';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserDTO } from 'src/app/models/user';
import { CityMunicipalityDTO, CityMunicipalityFragment } from 'src/app/models/cityMunicipality';
import { debounceTime, forkJoin, map, of, Subject } from 'rxjs';
import { OrderStatusType, OrderStatusTypeLabels } from 'src/app/models/orderStatusType';
import { iGenericListing } from 'src/app/shared/i-generic-listing/i-generic-listing';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, iGenericListing, AfterViewChecked {
  isLoading = false;
  order: OrderDTO = new OrderDTO();
  @ViewChild('tablecontainer') tableContainerRef: ElementRef;
  @ViewChild('tablecontainerParent') tablecontainerParentRef: ElementRef;
  orders: OrderDTO[] = [];
  customers: UserDTO[] = [];
  customer: UserDTO = new UserDTO();
  filter: boolean = true;
  sortDirection = '+';
  selectedCustomer: UserDTO;
  shipTos: CityMunicipalityDTO[] = [];
  OrderStatusType = OrderStatusType;
  OrderStatusTypeLabels = OrderStatusTypeLabels;
  shipTo: CityMunicipalityDTO = new CityMunicipalityDTO();
  currentPage: Number;
  totalPages: Number;
  listingOption: OrderListingOption = new OrderListingOption();
  private searchTextChanged = new Subject<string>(); // Subject to handle search text changes
  constructor(
    private orderService: AdminOrderService,
    public dashboardService: DashboardService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private renderer: Renderer2
  ) {

  }
  ngAfterViewChecked() {
    if (this.tableContainerRef && this.tableContainerRef.nativeElement) {
      this.renderer.setStyle(this.tableContainerRef.nativeElement, 'maxWidth', this.tablecontainerParentRef.nativeElement.offsetWidth + 'px');
      this.renderer.setStyle(this.tableContainerRef.nativeElement, 'overflow-y', 'hidden');
    }
  }
  sortBy(field: string) {
    if (this.listingOption.sortBy !== this.sortDirection+field) {
      this.sortDirection = "-";
    }
    this.listingOption.page = 1;
    this.sortDirection = this.sortDirection == "+" ? "-" : "+";
    this.listingOption.sortBy = this.sortDirection + field;
    this.loadContent();
  }
  toggleFilter() {
    this.filter = !this.filter;
  }
  ngOnInit(): void {
    this.isLoading = true;
    if (!this.authService.verifyAuth(true)) {
      this.isLoading = false;
      this.route.navigate(['403']);
      return;
    }
    this.searchTextChanged
      .pipe(debounceTime(200)) // 300 ms delay
      .subscribe(() => {
        this.loadContent();
    });
    this.listingOption.search = this.activatedRoute.snapshot.queryParams["search"];
    this.listingOption.sortBy = this.activatedRoute.snapshot.queryParams["sortBy"];
    this.listingOption.status = this.activatedRoute.snapshot.queryParams["status"] ?? OrderStatusType.ALL;
    this.listingOption.page = this.activatedRoute.snapshot.queryParams["page"];
    let shipTos = this.activatedRoute.snapshot.queryParams["shipTo"] ?? []
    let customers = this.activatedRoute.snapshot.queryParams["customer"] ?? []
    let shipTosRequest = shipTos.length > 0
    ? this.orderService.shipTos({ include: shipTos }).pipe(map((it: any) => this.shipTo.cityMunicipalityMapper(it?.result)))
    : of([]);
    let customerRequest = customers.length > 0
    ? this.orderService.users({ include: customers }).pipe(map((it: any) => this.customer.usersMapper(it?.result)))
    : of([]);

    // Use forkJoin to execute both requests concurrently
    forkJoin({
      shipTos: shipTosRequest,
      customers: customerRequest
    }).subscribe({
      next: (response) => {
        this.listingOption.shipTos = response.shipTos;
        this.listingOption.customers = response.customers;

        this.saveRouter();
        this.loadContent();
      },
      error: (err) => {
        console.error('Error fetching data', err);
        this.isLoading = false; // Handle error and stop loading
      }
    });
    
  }
  updateStatus(orderStatusType) {
    console.log(this.listingOption.status);
    this.loadContent();
  }
  onSearchChanged(): void {
    this.searchTextChanged.next(this.listingOption.search);
  }
  async navigate(page) {
    this.listingOption.page = page;
    this.loadContent();
  }
  searchCustomers(customer: string) {
    this.shipTos = [];
    this.orderService.users({
      customer: customer,
      exclude: this.listingOption.customers?.map(it=>it.id)
    }).subscribe({
      next: (it:any) => {
        this.customers = this.customer.usersMapper(it?.result);
      }
    });
  }
  selectCustomer(customer){
    this.listingOption.customers.push(customer);
    customer = null;
    this.customers = [];
    this.loadContent();
  }
  
  searchShipTos(shipTo: string) {
    this.customers = [];
    this.orderService.shipTos({
      shipTo: shipTo,
      exclude: this.listingOption.shipTos?.map(it=>it.id)
    }).subscribe({
      next: (it:any) => {
        this.shipTos = this.shipTo.cityMunicipalityMapper(it?.result);
      }
    });
  }
  selectShipTo(shipTo){
    this.listingOption.shipTos.push(shipTo);
    shipTo = null;
    this.shipTos = [];
    this.loadContent();
  }
  removeCustomer(customer: UserDTO) {
    this.listingOption.customers = this.listingOption.customers.filter(it => it.id != customer.id);
    this.loadContent();
  }
  removeShipTo(shipTo: CityMunicipalityFragment) {
    this.listingOption.shipTos = this.listingOption.shipTos.filter(it => it.id != shipTo.id);
    this.loadContent();
  }
  saveRouter() {
    this.route.navigate([], {
      queryParams: {
        page: this.listingOption.page,
        status: this.listingOption.status,
        search: this.listingOption.search,
        sortBy: this.listingOption.sortBy,
        customer: this.listingOption.customers ? this.listingOption.customers.map(it => it.id) : null,
        shipTo: this.listingOption.shipTos ? this.listingOption.shipTos.map(it => it.id) : null,
      },
      queryParamsHandling: 'merge',
    });
  }
  loadContent() {
    this.saveRouter();
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
