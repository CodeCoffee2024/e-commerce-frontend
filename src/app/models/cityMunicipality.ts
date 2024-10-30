import { Mapper } from "../shared/mapper";
import { Province, ProvinceDTO } from "./province";

export interface CityMunicipality {
    id: Number;
    description: string;
    province: Province;

}
export class CityMunicipalityDTO {
    id: Number;
    description: string;
    province: ProvinceDTO;
    cityMunicipalityMapper(data) {
        let cityMunicipalityMapper = new Mapper<CityMunicipality[], CityMunicipalityDTO[]>((cityMunicipalities: CityMunicipalityDTO[]): CityMunicipalityDTO[] => {
            return cityMunicipalities;
        })
        return cityMunicipalityMapper.map(data);
    }
}
export class CityMunicipalityFragment {
    id: Number;
    description: string;
}