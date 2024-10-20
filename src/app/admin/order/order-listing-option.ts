import { OrderStatusType } from "src/app/models/orderStatusType";
import { User, UserDTO } from "src/app/models/user";

export class OrderListingOption {
    searchText: string;
    customer: UserDTO;
    status: OrderStatusType;
    page: Number;
    sortBy: string
}