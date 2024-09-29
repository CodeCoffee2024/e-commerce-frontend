import { Mapper } from "../shared/mapper";
import { CityMunicipality, CityMunicipalityDTO } from "./cityMunicipality";

export interface Barangay {
    id: Number;
    description: string;
    cityMunicipality: CityMunicipality;

}
export class BarangayDTO {
    id: Number;
    description: string;
    cityMunicipality: CityMunicipalityDTO;
    barangayMapper(data) {
        let barangayArray = new Mapper<Barangay[], BarangayDTO[]>((barangays: BarangayDTO[]): BarangayDTO[] => {
            return barangays;
        })
        return barangayArray.map(data);
    }
}