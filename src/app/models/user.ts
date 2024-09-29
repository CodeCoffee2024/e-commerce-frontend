import { Category } from "./category";
import { Merchant } from "./merchant";
import { UserGoogle } from "./userGoogle";

export interface User {
    id?: number;
    name: string;
    email: string;
    google?: UserGoogle;
    user_google?: UserGoogle;
    email_verified_at?: Date;
    isGoogleAccount: boolean;
    isFacebookAccount: boolean;
    password?: string;
}