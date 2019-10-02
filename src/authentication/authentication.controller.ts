import { Controller, Post, Body } from "@nestjs/common";

import { AuthenticationService } from "./authentication.service";
import { Authentication } from "./authentication.model";

@Controller('users')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) { }

    @Post('/login')
    async login(@Body() payload: Authentication): Promise<Authentication> {
        return await this.authenticationService.login(payload);
    }
}