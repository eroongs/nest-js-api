import { Injectable, UnprocessableEntityException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import * as bcrypt from 'bcrypt';

import { Authentication } from "./authentication.model";
import { UserService } from './../users/user.service';

@Injectable()
export class AuthenticationService {
    private readonly userSessions: Authentication[] = [];

    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async login(payload: Authentication): Promise<Authentication> {
        const { user } = await this.userService.findByEmail(payload.email);

        if (!(await bcrypt.compare(payload.password, user.password))) {
            throw new UnprocessableEntityException('Incorrect password.');
        }

        const userSession = new Authentication({
            ...payload,
            id: user.id,
            token: await this.jwtService.signAsync({ id: user.id })
        });

        if ((await this.isSessionExists(user.id))) {
            const { index } = await this.findSessionById(user.id);
            this.userSessions.splice(index, 1, userSession);
        } else {
            this.userSessions.push(userSession);
        }

        return userSession;
    }

    async isSessionExists(id: string): Promise<boolean> {
        const index = this.userSessions.findIndex((session) => session.id === id);

        return (index === -1 ? false : true);
    }

    async findSessionById(id: string): Promise<{ index: number, session: { id: string, token: string } }> {
        const index = this.userSessions.findIndex((session) => session.id === id);
        const session = this.userSessions[index];

        if (!session) {
            throw new UnauthorizedException();
        }

        return { index: index, session: session };
    }

    async findSessionByToken(token: string): Promise<{ index: number, session: { id: string, token: string } }> {
        const index = this.userSessions.findIndex((session) => session.token === token);
        const session = this.userSessions[index];

        if (!session) {
            throw new UnauthorizedException();
        }

        return { index: index, session: session };
    }
}