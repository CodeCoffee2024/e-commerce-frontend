import { Mapper } from "../shared/mapper";

export interface Region {
    id: Number;
    description: string;

}
export class RegionDTO {
    id: Number;
    description: string;
    regionMapper(data) {
        let regionArray = new Mapper<Region[], RegionDTO[]>((regions: RegionDTO[]): RegionDTO[] => {
            return regions;
        })
        return regionArray.map(data);
    }
}
