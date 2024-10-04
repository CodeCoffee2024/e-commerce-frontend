import { Component, OnInit } from '@angular/core';
import { RegionDTO } from '../models/region';
import { ProvinceDTO } from '../models/province';
import { CityMunicipalityDTO } from '../models/cityMunicipality';
import { BarangayDTO } from '../models/barangay';
import { AddressService } from '../shared/address.service';
import { LoadingService } from '../shared/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-select-address',
  templateUrl: './mobile-select-address.component.html',
  styleUrls: ['./mobile-select-address.component.css']
})
export class MobileSelectAddressComponent implements OnInit{
  region: RegionDTO = new RegionDTO();
  regions: RegionDTO [] = [];
  province: ProvinceDTO = new ProvinceDTO();
  provinces: ProvinceDTO[] = [];
  cityMunicipality: CityMunicipalityDTO = new CityMunicipalityDTO();
  cityMunicipalities: CityMunicipalityDTO[] = [];
  barangay: BarangayDTO = new BarangayDTO();
  barangays: BarangayDTO[] = [];
  constructor(
    private addressService: AddressService,
    private loadingService: LoadingService,
    private router: Router
  ) {
   
  }
  ngOnInit(): void {
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
}
