import { Component, OnInit } from '@angular/core';
import { AddressDTO } from '../models/address';
import { AddressService } from '../shared/address.service';
import { Region, RegionDTO } from '../models/region';
import { Province, ProvinceDTO } from '../models/province';
import { BarangayDTO } from '../models/barangay';
import { CityMunicipality, CityMunicipalityDTO } from '../models/cityMunicipality';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from '../notification/notification';

@Component({
  selector: 'app-add-shipping-address',
  templateUrl: './add-shipping-address.component.html',
  styleUrls: ['./add-shipping-address.component.css']
})
export class AddShippingAddressComponent implements OnInit{
  addressForm: AddressDTO = new AddressDTO();
  regionSearch: string = '';
  regions: RegionDTO[] = [];
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
    private notificationService: NotificationService
  ){}
  ngOnInit(): void {
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
        this.router.navigate(['manage-addresses']);
      }, error: (error) => {
        this.addressForm.errors = this.errorHandlerService.handleFormError(error, this.addressForm.errors);
      }
    });
  }
  isDefaultDeliveryAddressChanged() {
    this.addressForm.isDefaultDeliveryAddress = !this.addressForm.isDefaultDeliveryAddress;
  }
  isDefaultReturnAddressChanged() {
    this.addressForm.isDefaultReturnAddress = !this.addressForm.isDefaultReturnAddress;
  }
}
