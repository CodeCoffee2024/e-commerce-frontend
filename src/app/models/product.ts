import { Category } from "./category";
import { CityMunicipalityDTO } from "./cityMunicipality";
import { Merchant } from "./merchant";
import { MerchantAddressDTO } from "./merchantAddress";

export interface Product {
    id: number;
    productName: string;
    isActive: boolean;
    productDescription: string;
    category: Category;
    merchant: Merchant;
    price: number;
    quantity: number;
    productImgPath: string;
    pickupAddress: MerchantAddressDTO;
    shippingFee: number;
    currentCityMunicipality: CityMunicipalityDTO;
}