import { Component, OnInit } from '@angular/core';
import { AddressService } from '../shared/address.service';
import { AddressDTO } from '../models/address';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../shared/dialog.service';
import { DialogType } from '../models/dialog';
import { ResponseType } from '../models/response';
import { LoadingService } from '../shared/loading.service';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from '../models/notification';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-mobile-shipping-address',
  templateUrl: './mobile-shipping-address.component.html',
  styleUrls: ['./mobile-shipping-address.component.css']
})
export class MobileShippingAddressComponent implements OnInit{
  addresses: AddressDTO[] = [];
  address: AddressDTO =  new AddressDTO();
  isSelectAddress = false;
  constructor(
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private loadingService: LoadingService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {

  }
  ngOnInit(): void {
    this.loadingService.show();
    if (!this.authService.verifyAuth()) {
      this.loadingService.hide();
      this.router.navigate(['403']);
      return;
    }
    this.addressService.addresses.subscribe({
      next: (result: any)=> {
        this.addresses = this.address.addressesMapper(result?.data);
      },
      complete: () => {
        this.loadingService.hide();
        this.route.queryParams.subscribe(params => {
          this.isSelectAddress = params['selectAddress'] === 'true'; // Convert to boolean if necessary
        });
      }
    })
  }
  addShippingAddress() {
    this.router.navigate(['add-shipping-address'], { queryParams: { selectAddress: this.isSelectAddress } })
  }
  updateAddress(address: AddressDTO) {
    this.router.navigate(['update-shipping-address/'], { queryParams: { selectAddress: this.isSelectAddress } })
  }
  async deleteAddress(address: AddressDTO) {
    await this.dialogService.openModal({type: DialogType.YESNO, message: "Are you sure you want to delete this address?", size: 'md'})
    .then((result :  ResponseType)=> {
      this.loadingService.show();
      if (result == ResponseType.OK || result == ResponseType.YES) {
        this.addressService.delete({id: address.id}).subscribe({
          next: (result : any) => {
            this.addresses = this.address.addressesMapper(result?.data);
            this.notificationService.openModal({
              type: NotificationType.REMOVEADDRESS,
              message: "Address successfully removed",
              header: null,
              timer: 3000})
          },complete: () => {
            this.loadingService.hide();
          }
        });
      }
    });
  }
  selectAddress(id) {
    if (this.isSelectAddress) {
      localStorage.setItem('selectedAddress', id);
      this.router.navigate(['checkout']);
    }
  }
  displayAddress (address: AddressDTO, addressType: string) {
    switch (addressType) {
      case "BlockLotFloorBuildingName":
        return "<span class='font-weight-bold'>House#/Blk#/Lt#/Bldg.Name:</span> " + address.blockLotFloorBuildingName;
      break;
      case "StreetAddress":
        return "<span class='font-weight-bold'>Street Address:</span> " +address.streetAddress;
      break;
      case "Barangay":
        return "<span class='font-weight-bold'>Barangay:</span> " +address.barangay.description;
      break;
      case "City/Municipality":
        return "<span class='font-weight-bold'>City/Municipality:</span> " +address.cityMunicipality.description;
      break;
      case "Province":
        return "<span class='font-weight-bold'>Province:</span> " +address.province.description;
      break;
      default:
        return  "<span class='font-weight-bold'>Region:</span> " +address.region.description;
    }
  }
}
