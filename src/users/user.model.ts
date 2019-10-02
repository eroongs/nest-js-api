import { IsEmail, IsString, IsISO8601, IsNotEmpty, IsOptional } from "class-validator";
import { Exclude } from 'class-transformer';

export class User {
    @Exclude({ toClassOnly: true })
    id: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    name: string

    @Exclude({ toPlainOnly: true })
    @IsString()
    @IsNotEmpty()
    password: string

    @Exclude({ toClassOnly: true })
    @IsISO8601()
    @IsOptional()
    created_at: Date

    @Exclude({ toClassOnly: true })
    @IsISO8601()
    @IsOptional()
    updated_at: Date

    @Exclude({ toClassOnly: true })
    @IsISO8601()
    @IsOptional()
    deleted_at: Date

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}