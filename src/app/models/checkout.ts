import { Mapper } from "../shared/mapper";
import { Address } from "./address";
import { Cart } from "./cart";
import { PaymentOption } from "./paymentOption";

export interface Checkout {
    paymentOption: PaymentOption;
    cartItems: Cart[];
    shippingAddress: Address;
}
export class CheckoutDTO implements Checkout {
    paymentOption: PaymentOption;
    cartItems: Cart[];
    shippingAddress: Address;
}
export class CheckoutForm implements Checkout {
    paymentOption: PaymentOption;
    cartItems: Cart[];
    shippingAddress: Address;
    format(data) {
        this.paymentOption = data?.paymentOption;
        this.cartItems = data?.cartItems;
        this.shippingAddress = data?.shippingAddress;
    }
}