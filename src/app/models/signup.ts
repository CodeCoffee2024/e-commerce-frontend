import { DTO } from "./dto";

export interface Signup {
    email: string;
    password: string;
}
export class SignupDTO extends DTO {
    email: string;
    isGoogleAccount = false;
    isFacebookAccount = false;
    password: string;
    repeatPassword: string;
}