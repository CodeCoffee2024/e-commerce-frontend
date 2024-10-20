import { Timestamp } from "rxjs";
import { Merchant } from "./merchant";
import { Product } from "./product";

export interface Cart {
    id?: number;
    isSelected: boolean;
    product: Product;
    datetime: Date;
    quantity: Number;
    quantity2: Number;
    total: Number;
}