import { Barangay, BarangayDTO } from "./barangay";
import { CityMunicipality, CityMunicipalityDTO } from "./cityMunicipality";
import { DTO } from "./dto";
import { Province, ProvinceDTO } from "./province";
import { Region, RegionDTO } from "./region";

export interface Address {
    blockLotFloorBuildingName: string;
    streetAddress: string;
    zipCode: string;
    barangay: Barangay;
    region: Region;
    province: Province;
    cityMunicipality: CityMunicipality;
}
export class AddressDTO  extends DTO {
    blockLotFloorBuildingName: string;
    streetAddress: string;
    zipCode: string;
    barangay: BarangayDTO;
    region: RegionDTO;
    province: ProvinceDTO;
    cityMunicipality: CityMunicipalityDTO;
    isDefaultDeliveryAddress: boolean = false;
    isDefaultReturnAddress: boolean = false;
}