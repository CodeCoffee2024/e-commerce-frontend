import { Merchant, MerchantDTO } from "./merchant";

export interface ShippingMerchant {
    merchant: MerchantDTO;
    shippingFee: Number;
}
export class ShippingMerchantDTO implements ShippingMerchant {
    merchant: MerchantDTO;
    shippingFee: Number;
}