import { Timestamp } from "rxjs";
import { Merchant } from "./merchant";
import { Product } from "./product";
import { Mapper } from "../shared/mapper";

export interface Cart {
    id?: number;
    isSelected: boolean;
    product: Product;
    datetime: Date;
    quantity: Number;
    quantity2: Number;
    total: Number;
}
export class CartDTO implements Cart {
    id?: number;
    isSelected: boolean;
    product: Product;
    datetime: Date;
    quantity: Number;
    quantity2: Number;
    total: Number;
    cartsMapper(data) {
        let cartArray = new Mapper<Cart[], CartDTO[]>((carts: CartDTO[]): CartDTO[] => {
            return carts;
        })
        return cartArray.map(data);
    }
}