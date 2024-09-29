import { Mapper } from "../shared/mapper";
import { Region, RegionDTO } from "./region";

export interface Province {
    id: Number;
    description: string;
    region: Region;

}
export class ProvinceDTO {
    id: Number;
    description: string;
    region: RegionDTO;
    provinceMapper(data) {
        let provinceMapper = new Mapper<Province[], ProvinceDTO[]>((provinces: ProvinceDTO[]): ProvinceDTO[] => {
            return provinces;
        })
        return provinceMapper.map(data);
    }
}