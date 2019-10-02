import { Exclude } from "class-transformer";
import { IsNotEmpty, IsString, IsOptional, IsISO8601 } from "class-validator";

export class Topic {
    @Exclude({ toClassOnly: true })
    id: string;

    @IsNotEmpty()
    @IsString()
    subject: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @Exclude({ toClassOnly: true })
    @IsString()
    @IsOptional()
    created_by: string;

    @Exclude({ toClassOnly: true })
    @IsString()
    @IsOptional()
    updated_by: string;

    @Exclude({ toClassOnly: true })
    @IsOptional()
    @IsISO8601()
    created_at: Date;

    @Exclude({ toClassOnly: true })
    @IsOptional()
    @IsISO8601()
    updated_at: Date;

    @Exclude()
    @IsOptional()
    @IsISO8601()
    deleted_at: Date;

    constructor(partial: Partial<Topic>) {
        Object.assign(this, partial);
    }
}