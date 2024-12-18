import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DockElementComponent } from '../dock-element/dock-element.component';
import { MobileSingleProductSpecificationComponent } from '../mobile-single-product-specification/mobile-single-product-specification.component';
import { MobileSingleProductOptionComponent } from '../mobile-single-product-option/mobile-single-product-option.component';
import { Product } from '../models/product';
import { CartService } from '../cart/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SingleProductService } from './single-product.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { Mapper } from '../shared/mapper';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from '../models/notification';
import { AuthService } from '../shared/auth.service';
import { MobileLoginComponent } from '../mobile-login/mobile-login.component';
import { LoginComponent } from '../login/login.component';
import { LoadingService } from '../shared/loading.service';
import { RegionDTO } from '../models/region';
import { ProvinceDTO } from '../models/province';
import { CityMunicipalityDTO } from '../models/cityMunicipality';
import { BarangayDTO } from '../models/barangay';
import { AddressService } from '../shared/address.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit{
  product: Product;
  region: RegionDTO = new RegionDTO();
  regions: RegionDTO [] = [];
  province: ProvinceDTO = new ProvinceDTO();
  provinces: ProvinceDTO[] = [];
  cityMunicipality: CityMunicipalityDTO = new CityMunicipalityDTO();
  cityMunicipalities: CityMunicipalityDTO[] = [];
  barangay: BarangayDTO = new BarangayDTO();
  quantity = 1;
  showDropdown = false;
  id : Number;
  constructor(private modalService: NgbModal,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public dashboardService: DashboardService,
    private singleProductService: SingleProductService,
    private notificationService: NotificationService,
    private loadingService: LoadingService,
    private addressService: AddressService
  ) {}
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadingService.show();
    this.singleProductService.getProduct(this.id, JSON.parse(localStorage.getItem('currentCityMunicipality'))?.id).subscribe(product => {
      let productMapper = new Mapper<Product, Product>((product: Product): Product => {
        return product;
      })
      this.product = productMapper.map(product as Product);
      this.loadingService.hide();
    });
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown) {
      this.addressService.allRegions().subscribe({
        next: (it:any) => {
          this.regions = this.region.regionMapper(it?.data);
        }
      });
    }
  }
  increment() {
    this.quantity ++;
  }
  decrement() {
    if (this.quantity < 2) {
      return;
    }
    this.quantity --;
  }
  toggleProductSpecifications() {
    if (window.innerWidth < 1024 ) {
      const modalRef = this.modalService.open(DockElementComponent, { 
        backdrop: 'static',  // Optional: Prevent closing by clicking outside
        keyboard: false,      // Optional: Prevent closing by ESC key });
        animation: false
      });
      modalRef.componentInstance.data = {
        title: "Specifications",
        hideCloseBtn: true,
        targetComponent: MobileSingleProductSpecificationComponent
      };
    }
  }
  addToCart(product: Product) {
    this.loadingService.show();
    if (this.authService.verifyAuth()) {
      this.cartService.addItem(product, this.quantity);
      this.notificationService.openModal({
        type: NotificationType.ADDTOCART,
        message: "Product Added To Cart Successfully",
        header: null,
        timer: 3000})
      this.loadingService.hide();
    } else {
      if (window.innerWidth <= 768) {
        this.loadingService.hide();
        const modalRef = this.modalService.open(DockElementComponent, { 
          backdrop: 'static',  // Optional: Prevent closing by clicking outside
          keyboard: false,      // Optional: Prevent closing by ESC key });
          animation: false
        });
        modalRef.componentInstance.data = {
          title: "Login",
          hideTitle: true,
          targetComponent: MobileLoginComponent
        };
        // Handle the result from the modal
        modalRef.result.then((result) => {
          if (result?.success) {
            this.cartService.addItem(product, this.quantity);
            this.notificationService.openModal({
              type: NotificationType.ADDTOCART,
              message: "Product Added To Cart Successfully",
              header: null,
              timer: 3000})
          }
        }).catch((error) => {
          console.error('Modal dismissed with error:', error);
          this.loadingService.hide();
        });
      } else {
        const modalRef = this.modalService.open(LoginComponent, { 
          backdrop: 'static',  // Optional: Prevent closing by clicking outside
          keyboard: false,      // Optional: Prevent closing by ESC key });
          animation: false
        });
        this.loadingService.hide();
      }
    }
  }
  buyNow(product: Product) {
    this.loadingService.show();
    if (this.authService.verifyAuth()) {
      this.cartService.addItem(product, this.quantity, true);
      this.router.navigate(['cart'])
      this.loadingService.hide();
    } else {
      if (window.innerWidth <= 768) {
        this.loadingService.hide();
        const modalRef = this.modalService.open(DockElementComponent, { 
          backdrop: 'static',  // Optional: Prevent closing by clicking outside
          keyboard: false,      // Optional: Prevent closing by ESC key });
          animation: false
        });
        modalRef.componentInstance.data = {
          title: "Login",
          hideTitle: true,
          targetComponent: MobileLoginComponent
        };
        modalRef.result.then((result) => {
          if (result?.success) {
            this.router.navigate(['cart'])
            this.cartService.addItem(product, this.quantity, true);
          }
        });
      } else {
        const modalRef = this.modalService.open(LoginComponent, { 
          backdrop: 'static',  // Optional: Prevent closing by clicking outside
          keyboard: false,      // Optional: Prevent closing by ESC key });
          animation: false
        });
        this.loadingService.hide();
      }
    }
  }
  toggleProductOptions() {
    if (window.innerWidth < 1024 ) {
      const modalRef = this.modalService.open(DockElementComponent, { 
        backdrop: 'static',  // Optional: Prevent closing by clicking outside
        keyboard: false,      // Optional: Prevent closing by ESC key });
        animation: false
      });
      modalRef.componentInstance.hideCloseBtn = true;
      modalRef.componentInstance.hideTitle = true;
      modalRef.componentInstance.data = {
        hideCloseBtn: false,
        hideTitle: false,
        allowFloatingClose: true,
        targetComponent: MobileSingleProductOptionComponent
      };
    }
  }
  get isDesktop() {
    return window.innerWidth > 768;
  }
  changeAddress() {
    localStorage.setItem('lastLocation', '/product/'+ this.id);
    this.router.navigate(['select-address-mobile']);
  }
  clearRegion() {
    this.region = new RegionDTO();
    this.province = new ProvinceDTO();
    this.cityMunicipality = new CityMunicipalityDTO();
    this.loadingService.show();
    this.addressService.allRegions().subscribe({
      next: (regions:any) => {
        this.regions = this.region.regionMapper(regions?.data);
      },complete: ()=> {
        this.loadingService.hide();
      }
    })
  }
  selectRegion(region: RegionDTO) {
    this.region = region;
    this.loadingService.show();
    this.addressService.allProvinces({region: region.id}).subscribe({
      next: (provinces:any) => {
        this.provinces = this.province.provinceMapper(provinces?.data);
      },complete: () => {
        this.loadingService.hide();
      }
    })
  }
  selectProvince(province: ProvinceDTO) {
    this.province = province;
    this.cityMunicipality = new CityMunicipalityDTO();
    this.loadingService.show();
    this.addressService.allCityMunicipalities({region: this.region.id, province: this.province.id}).subscribe({
      next: (cityMunicipalities:any) => {
        this.cityMunicipalities = this.cityMunicipality.cityMunicipalityMapper(cityMunicipalities?.data);
      },complete: () => {
        this.loadingService.hide();
      }
    })
  }
  selectCityMunicipality(cityMunicipality: CityMunicipalityDTO) {
    this.cityMunicipality = cityMunicipality;
    let lastLocation = localStorage.getItem('lastLocation');
    if (lastLocation) {
      localStorage.setItem('currentCityMunicipality', JSON.stringify(this.cityMunicipality));
      localStorage.removeItem('lastLocation');
      this.router.navigate([lastLocation]);
    } else {
      this.router.navigate(['']);
    }
  }
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event): void {
    if (event.target.classList.contains('change-button')) {
      return;
    }
    this.showDropdown = event.target.classList.contains('address');
    if (this.showDropdown) {
      this.addressService.allRegions().subscribe({
        next: (it:any) => {
          this.regions = this.region.regionMapper(it?.data);
        }
      });
    }
  }
}
