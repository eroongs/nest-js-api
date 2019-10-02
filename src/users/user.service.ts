import { Injectable, UnprocessableEntityException, NotFoundException } from '@nestjs/common';

import { v1 as v1uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import { User } from './user.model';

@Injectable()
export class UserService {
    private readonly users: User[] = [];

    constructor() { }

    async register(payload: User): Promise<User> {
        if ((await this.isEmailExists(payload.email))) {
            throw new UnprocessableEntityException('User already exists.');
        }
        
        const user = new User({
            id: v1uuid(),
            created_at: new Date(),
            updated_at: new Date(),
            ...payload,
            password : await bcrypt.hash(payload.password, 10)
        });

        this.users.push(user);

        return user;
    }

    async isEmailExists(email: string): Promise<boolean> {
        const index = this.users.findIndex((user) => user.email === email);

        return (index === -1 ? false : true)
    }

    async isUserExists(id: string): Promise<boolean> {
        const index = this.users.findIndex((user) => user.id === id);

        return (index === -1 ? false : true)
    }

    async findByEmail(email: string): Promise<{ index: number, user: User }> {
        const index = this.users.findIndex((user) => user.email === email);
        const user = this.users[index];

        if (!user) {
            throw new NotFoundException('User does not exists.');
        }

        return { index: index, user: user };
    }

    async findById(id: string): Promise<{ index: number, user: User }> {
        const index = this.users.findIndex((user) => user.id === id);
        const user = this.users[index];

        if (!user) {
            throw new NotFoundException('User does not exists.');
        }

        return { index: index, user: user };
    }

    
}
