import { FormsModule } from "@angular/forms";
import { BarangayDTO } from "../models/barangay";
import { RegionDTO } from "../models/region";
import { ProvinceDTO } from "../models/province";
import { CityMunicipalityDTO } from "../models/cityMunicipality";

export class AddressForm extends FormsModule {
    id: Number;
    blockLotFloorBuildingName: string;
    streetAddress: string;
    zipCode: string;
    barangay: BarangayDTO;
    region: RegionDTO;
    province: ProvinceDTO;
    isSelected: boolean;
    cityMunicipality: CityMunicipalityDTO;
    isDefaultDeliveryAddress: boolean = false;
    format (addressForm: AddressForm) {
        this.id = addressForm?.id;
        this.blockLotFloorBuildingName = addressForm.blockLotFloorBuildingName;
        this.streetAddress = addressForm.streetAddress;
        this.zipCode = addressForm.zipCode;
        this.barangay = addressForm.barangay;
        this.region = addressForm.region;
        this.province = addressForm.province;
        this.cityMunicipality = addressForm.cityMunicipality;
        this.isDefaultDeliveryAddress = addressForm.isDefaultDeliveryAddress;
        return this;
    }
    displayAddress (addressType: string) {
      switch (addressType) {
        case "BlockLotFloorBuildingName":
          return "<span class='font-weight-bold'>House#/Blk#/Lt#/Bldg.Name:</span> " + this.blockLotFloorBuildingName;
        break;
        case "StreetAddress":
          return "<span class='font-weight-bold'>Street Address:</span> " +this.streetAddress;
        break;
        case "Barangay":
          return "<span class='font-weight-bold'>Barangay:</span> " +this.barangay.description;
        break;
        case "City/Municipality":
          return "<span class='font-weight-bold'>City/Municipality:</span> " +this.cityMunicipality.description;
        break;
        case "Province":
          return "<span class='font-weight-bold'>Province:</span> " +this.province.description;
        break;
        default:
          return  "<span class='font-weight-bold'>Region:</span> " +this.region.description;
      }
    }
}