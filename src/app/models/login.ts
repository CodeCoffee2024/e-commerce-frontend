import { DTO } from "./dto";

export interface Login {
    email: string;
    password: string;
}
export class LoginDTO extends DTO{
    email: string;
    isGoogleAccount = false;
    isFacebookAccount = false;
    password: string;
}