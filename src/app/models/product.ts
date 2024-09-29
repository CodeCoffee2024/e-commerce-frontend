import { Category } from "./category";
import { Merchant } from "./merchant";

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
}