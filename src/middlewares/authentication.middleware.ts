import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UserService } from './../users/user.service';
import { AuthenticationService } from './../authentication/authentication.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService, private readonly userService: UserService, private readonly authenticationService: AuthenticationService) { }

    async use(request, response, next) {
        const authorization = request.headers.authorization;

        if (!authorization) {
            throw new UnauthorizedException();
        }

        const token = authorization.split(' ')[1];
        const claims = await this.jwtService.verifyAsync(token)
            .catch(() => { throw new UnauthorizedException(); });

        if (!(await this.userService.isUserExists(claims.id) && !!await this.authenticationService.findSessionByToken(token))) {
            throw new UnauthorizedException();
        }

        request.user = claims.id;

        next();
    }
}