import { CityMunicipalityFragment } from "src/app/models/cityMunicipality";
import { OrderStatusType } from "src/app/models/orderStatusType";
import { User, UserDTO } from "src/app/models/user";

export class OrderListingOption {
    search: string;
    customers: UserDTO[] = [];
    shipTos: CityMunicipalityFragment[] = [];
    status: OrderStatusType = OrderStatusType.ALL;
    page: Number;
    sortBy: string;
}