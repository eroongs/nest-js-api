import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Exclude } from "class-transformer";

export class Authentication {

    @Exclude({ toPlainOnly: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Exclude({ toPlainOnly: true })
    @IsString()
    @IsNotEmpty()
    password: string;

    @Exclude({ toClassOnly: true })
    token: string;

    @Exclude()
    id: string;

    constructor(partial: Partial<Authentication>) {
        Object.assign(this, partial);
    }
}