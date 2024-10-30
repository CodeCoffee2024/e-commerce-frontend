import { Mapper } from "../shared/mapper";
import { Category } from "./category";
import { DTO } from "./dto";
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
export class UserDTO implements User {
    id?: number;
    username: string;
    name: string;
    email: string;
    google?: UserGoogle;
    user_google?: UserGoogle;
    email_verified_at?: Date;
    isGoogleAccount: boolean;
    isFacebookAccount: boolean;
    password?: string;
    
    userMapper(data) {
        let userMapper = new Mapper<User, UserDTO>((users: UserDTO): UserDTO => {
            return users;
        })
        return userMapper.map(data);
    }
    usersMapper(data) {
        let userMapper = new Mapper<User[], UserDTO[]>((users: UserDTO[]): UserDTO[] => {
            return users;
        })
        return userMapper.map(data);
    }
}
export class UserForm extends DTO implements User {
    id?: number;
    username: string;
    name: string;
    email: string;
    google?: UserGoogle;
    user_google?: UserGoogle;
    email_verified_at?: Date;
    isGoogleAccount: boolean;
    isFacebookAccount: boolean;
    password?: string;
    
}
export class UserFragment {
    id?: number;
    name: string;
}