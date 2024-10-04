import { Component, OnInit } from '@angular/core';
import { AddressDTO } from '../models/address';
import { AddressService } from '../shared/address.service';
import { Region, RegionDTO } from '../models/region';
import { Province, ProvinceDTO } from '../models/province';
import { BarangayDTO } from '../models/barangay';
import { CityMunicipality, CityMunicipalityDTO } from '../models/cityMunicipality';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from '../models/notification';
import { LoadingService } from '../shared/loading.service';

@Component({
  selector: 'app-update-shipping-address',
  templateUrl: './update-shipping-address.component.html',
  styleUrls: ['./update-shipping-address.component.css']
})
export class UpdateShippingAddressComponent implements OnInit{
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
  constructor(
    private addressService: AddressService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private loadingService: LoadingService
  ){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isSelectAddress = params['selectAddress'] === 'true'; // Convert to boolean if necessary
    });
    this.loadingService.show();
    let id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.loadingService.hide();
      this.router.navigate(['404']);
    } else {
      let params = {id: id};
      this.addressService.getAddress(params).subscribe({
        next: (address:any) => {
          this.addressForm = this.addressForm.addressMapper(address?.data);
          console.log(this.addressForm);
        },
        complete: () => {
          this.loadingService.hide();
        }
      })
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
  updateShippingAddress() {
    this.addressService.createOrUpdate(this.addressForm).subscribe({
      next: (it:any) => {
        this.notificationService.openModal({
          type: NotificationType.ADDADDRESS,
          message: "Address successfully updated",
          header: null,
          timer: 3000})
        this.router.navigate(['manage-addresses'], { queryParams: { selectAddress: this.isSelectAddress }});
      }, error: (error) => {
        this.addressForm.errors = this.errorHandlerService.handleFormError(error, this.addressForm.errors);
      }
    });
  }
  isDefaultDeliveryAddressChanged() {
    this.addressForm.isDefaultDeliveryAddress = !this.addressForm.isDefaultDeliveryAddress;
  }
}
