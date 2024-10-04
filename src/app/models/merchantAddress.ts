import { Barangay } from "./barangay";
import { CityMunicipality } from "./cityMunicipality";
import { Province } from "./province";
import { Region } from "./region";

export interface MerchantAddress {
    
    id: Number;
    blockLotFloorBuildingName: string;
    streetAddress: string;
    zipCode: string;
    barangay: Barangay;
    region: Region;
    province: Province;
    cityMunicipality: CityMunicipality;
}

export class MerchantAddressDTO implements MerchantAddress {
    id: Number;
    blockLotFloorBuildingName: string;
    streetAddress: string;
    zipCode: string;
    barangay: Barangay;
    region: Region;
    province: Province;
    cityMunicipality: CityMunicipality;
}