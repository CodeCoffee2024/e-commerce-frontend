import { Mapper } from "../shared/mapper";
import { Barangay, BarangayDTO } from "./barangay";
import { CityMunicipality, CityMunicipalityDTO } from "./cityMunicipality";
import { DTO } from "./dto";
import { Province, ProvinceDTO } from "./province";
import { Region, RegionDTO } from "./region";

export interface Address {
    id: Number;
    blockLotFloorBuildingName: string;
    streetAddress: string;
    zipCode: string;
    barangay: Barangay;
    region: Region;
    province: Province;
    cityMunicipality: CityMunicipality;
}
export class AddressDTO  extends DTO {
    id: Number;
    blockLotFloorBuildingName: string;
    streetAddress: string;
    zipCode: string;
    barangay: BarangayDTO;
    region: RegionDTO;
    province: ProvinceDTO;
    cityMunicipality: CityMunicipalityDTO;
    isDefaultDeliveryAddress: boolean = false;
    addressMapper(data) {
      let addressMapper = new Mapper<Address, AddressDTO>((address: AddressDTO): AddressDTO => {
          return address;
      })
      return addressMapper.map(data);
    }
    addressesMapper(data) {
      let addressMapper = new Mapper<Address[], AddressDTO[]>((addresses: AddressDTO[]): AddressDTO[] => {
          return addresses;
      })
      return addressMapper.map(data);
    }
}