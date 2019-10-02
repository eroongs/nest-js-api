import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, IsOptional, IsISO8601 } from 'class-validator';

export class Message {
    @Exclude({ toClassOnly: true })
    id: string;

    @IsNotEmpty()
    @IsString()
    message: string;

    @Exclude({ toClassOnly: true })
    @IsOptional()
    @IsString()
    topic_id: string;

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

    constructor(partial: Partial<Message>) {
        Object.assign(this, partial);
    }
}