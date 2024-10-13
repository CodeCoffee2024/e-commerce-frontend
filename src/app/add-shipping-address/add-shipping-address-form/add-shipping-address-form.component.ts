import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddressDTO } from '../../models/address';
import { AddressService } from '../../shared/address.service';
import { Region, RegionDTO } from '../../models/region';
import { Province, ProvinceDTO } from '../../models/province';
import { BarangayDTO } from '../../models/barangay';
import { CityMunicipality, CityMunicipalityDTO } from '../../models/cityMunicipality';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../notification/notification.service';
import { NotificationType } from '../../models/notification';
import { LoadingService } from '../../shared/loading.service';
import { AuthService } from '../../shared/auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-shipping-address-form',
  templateUrl: './add-shipping-address-form.component.html',
  styleUrls: ['./add-shipping-address-form.component.css']
})
export class AddShippingAddressFormComponent implements OnInit {
  addressForm: AddressDTO = new AddressDTO();
  regionSearch: string = '';
  regions: RegionDTO[] = [];
  isSelectAddress = false;
  region: RegionDTO = new RegionDTO();
  cityMunicipalities: CityMunicipalityDTO[] = [];
  cityMunicipality: CityMunicipalityDTO = new CityMunicipalityDTO();
  provinces: ProvinceDTO[] = [];
  province: ProvinceDTO = new ProvinceDTO();
  barangays: BarangayDTO[] = [];
  barangay: BarangayDTO = new BarangayDTO();
  @Input() reloadAfterSave = true;
  @Output() hasDefaultAddress = new EventEmitter<boolean>();
  constructor(
    private addressService: AddressService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isSelectAddress = params['selectAddress'] === 'true'; // Convert to boolean if necessary
    });
    this.loadingService.show();
    if (!this.authService.verifyAuth()) {
      this.loadingService.hide();
      this.router.navigate(['403']);
      return;
    } else {
      this.loadingService.hide();
    }
  }
  onRegionChanged(item) {
    this.addressService.provinces({region: item.id}).subscribe({
      next: (it:any) => {
        this.provinces = this.province.provinceMapper(it?.data);
      }
    });
  }
  searchBarangays(barangay:string) {
    if (!barangay) {
      this.addressForm.barangay = null;
      this.addressForm.cityMunicipality = null;
      this.addressForm.province = null;
      this.addressForm.region = null;
      this.barangays = [];
      return;
    }
    let param = {barangay: barangay};
    this.addressService.barangays(param).subscribe({
      next: (it:any) => {
        this.barangays = this.barangay.barangayMapper(it?.data);
      }
    });
  }
  searchCityMunicipalities(cityMunicipality:string) {
    if (!cityMunicipality) {
      this.addressForm.cityMunicipality = null;
      this.addressForm.province = null;
      this.addressForm.region = null;
      this.cityMunicipalities = [];
      return;
    }
    let param = {barangay: this.addressForm.barangay.description, cityMunicipality: cityMunicipality};
    this.addressService.cityMunicipalities(param).subscribe({
      next: (it:any) => {
        this.cityMunicipalities = this.cityMunicipality.cityMunicipalityMapper(it?.data);
      }
    });
  }
  searchProvinces(province:string) {
    if (!province) {
      this.addressForm.province = null;
      this.addressForm.region = null;
      this.provinces = [];
      return;
    }
    let param = {
      barangay: this.addressForm.barangay.description,
      cityMunicipality: this.addressForm.cityMunicipality.description,
      province: province
    };
    this.addressService.provinces(param).subscribe({
      next: (it:any) => {
        this.provinces = this.province.provinceMapper(it?.data);
      }
    });
  }
  searchRegions(region:string) {
    if (!region) {
      this.addressForm.region = null;
      this.regions = [];
      return;
    }
    let param = {
      barangay: this.addressForm.barangay.description,
      province: this.addressForm.province.description,
      cityMunicipality: this.addressForm.cityMunicipality.description,
      region: region
    };
    this.addressService.regions(param).subscribe({
      next: (it:any) => {
        this.regions = this.region.regionMapper(it?.data);
      }
    });
  }
  addShippingAddress() {
    this.addressService.createOrUpdate(this.addressForm).subscribe({
      next: (it:any) => {
        this.notificationService.openModal({
          type: NotificationType.ADDADDRESS,
          message: "Address successfully added",
          header: null,
          timer: 3000})
        if (window.innerWidth < 1024) {
          this.router.navigate(['manage-addresses'], { queryParams: { selectAddress: this.isSelectAddress }});
        } else {
          if (this.reloadAfterSave) {
            window.location.reload();
          } else {
            
            this.hasDefaultAddress.emit(this.addressForm.isDefaultDeliveryAddress? it?.address.id:null);
          }
        }
      }, error: (error) => {
        this.addressForm.errors = this.errorHandlerService.handleFormError(error, this.addressForm.errors);
      }
    });
  }
  isDefaultDeliveryAddressChanged() {
    this.addressForm.isDefaultDeliveryAddress = !this.addressForm.isDefaultDeliveryAddress;
  }
}
