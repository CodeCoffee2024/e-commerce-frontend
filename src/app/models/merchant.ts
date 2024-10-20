export interface Merchant {
    id: number;
    name: string;
    description: string;
    imgPath: string;
    isActive: boolean;
}export class MerchantDTO implements Merchant {
    id: number;
    name: string;
    description: string;
    imgPath: string;
    isActive: boolean;
}