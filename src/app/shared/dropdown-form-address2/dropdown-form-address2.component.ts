import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { CityMunicipalityDTO } from 'src/app/models/cityMunicipality';
import { ProvinceDTO } from 'src/app/models/province';
import { RegionDTO } from 'src/app/models/region';
import { AddressService } from '../address.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dropdown-form-address2',
  templateUrl: './dropdown-form-address2.component.html',
  styleUrls: ['./dropdown-form-address2.component.css']
})
export class DropdownFormAddress2Component implements OnInit{
  @Input() data: any[] = [];
  @Input() formModel: any;
  searchText = null;
  label = 'Region';
  regionSearch: string = '';
  isSelectAddress = false;
  regions: RegionDTO[] = [];
  region: RegionDTO = new RegionDTO();
  provinces: ProvinceDTO[] = [];
  province: ProvinceDTO = new ProvinceDTO();
  cityMunicipalities: CityMunicipalityDTO[] = [];
  isLoading = false;
  load = true;
  cityMunicipality: CityMunicipalityDTO = new CityMunicipalityDTO();
  @Output() formModelChange = new EventEmitter<any>();
  // @Output() userSearchedText = new EventEmitter<any>();
  @Output() selectionChanged = new EventEmitter<string>();
  private searchTextChanged = new Subject<string>(); // Subject to handle search text changes

  constructor(public dashboardService: DashboardService,
    private addressService: AddressService,
    private router: Router,
  ) {
    
  }
  ngOnInit(): void {
    this.clearRegion();
    this.searchTextChanged
      .pipe(debounceTime(300)) // 300 ms delay
      .subscribe(() => {
        this.onSearchChange(); // Trigger search after delay
    });
  }
  clearRegion() {
    this.region = new RegionDTO();
    this.province = new ProvinceDTO();
    this.label = 'Region';
    this.cityMunicipality = new CityMunicipalityDTO();
    this.isLoading = true;
    this.addressService.allRegions().subscribe({
      next: (regions:any) => {
        this.regions = this.region.regionMapper(regions?.data);
      },complete: ()=> {
        this.isLoading = false;
      }
    })
  }
  selectRegion(region: RegionDTO) {
    this.region = region;
    this.isLoading = true;
    this.label = 'Province';
    this.addressService.allProvinces({region: region.id}).subscribe({
      next: (provinces:any) => {
        this.provinces = this.province.provinceMapper(provinces?.data);
      },complete: () => {
        this.isLoading = false;
      }
    })
  }
  selectProvince(province: ProvinceDTO) {
    this.province = province;
    this.cityMunicipality = new CityMunicipalityDTO();
    this.isLoading = true;
    this.label = 'City/Municipality';
    this.addressService.allCityMunicipalities({region: this.region.id, province: this.province.id}).subscribe({
      next: (cityMunicipalities:any) => {
        this.cityMunicipalities = this.cityMunicipality.cityMunicipalityMapper(cityMunicipalities?.data);
      },complete: () => {
        this.isLoading = false;
      }
    })
  }
  onSearchTextChanged(): void {
    this.searchTextChanged.next(this.searchText);
  }

  onSearchChange(): void {
    if (this.searchText.trim().length > 0) {
      this.isLoading = true;
      if (!this.region.id) {
        this.addressService.searchRegion({region:this.searchText}).subscribe(
          {
            next: (result:any) => {
              this.regions = this.region.regionMapper(result?.data);
            }, complete: () => {
              this.isLoading = false;
            }
          }
        )
      }
      // this.userSearchedText.emit(this.searchText);
    } else{
      // this.userSearchedText.emit(null);
      // this.selectionChanged.emit(null);
    }
  }
  selectCityMunicipality(cityMunicipality: CityMunicipalityDTO) {
    this.cityMunicipality = cityMunicipality;
    let lastLocation = localStorage.getItem('lastLocation');
    this.load = false;
    localStorage.setItem('currentCityMunicipality', JSON.stringify(this.cityMunicipality));
    localStorage.removeItem('lastLocation');
    window.location.reload();
  }
}