import { Mapper } from "../shared/mapper";
import { Cart } from "./cart";
import { CityMunicipality, CityMunicipalityDTO } from "./cityMunicipality";
import { Merchant } from "./merchant";
import { PaymentOption } from "./paymentOption";
import { UserDTO, UserFragment } from "./user";

export interface Order {
    id: Number;
    cart: Cart[];
    paymentOption: PaymentOption;
    referenceNumber: string;
    status: string;
    customer: UserFragment;
    totalPrice: Number;
    totalShipping: Number;
}
export class OrderDTO implements Order {
    id: Number;
    cart: Cart[];
    paymentOption: PaymentOption;
    status: string;
    referenceNumber: string;
    customer: UserFragment;
    shipTo: CityMunicipalityDTO;
    totalPrice: Number;
    totalShipping: Number;
    grandTotal: Number;
    orderMapper(data) {
        let orderMapper = new Mapper<Order, OrderDTO>((orders: OrderDTO): OrderDTO => {
            return orders;
        })
        return orderMapper.map(data);
    }
    ordersMapper(data) {
        let orderMapper = new Mapper<Order[], OrderDTO[]>((orders: OrderDTO[]): OrderDTO[] => {
            return orders;
        })
        return orderMapper.map(data);
    }
}
