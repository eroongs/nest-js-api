import { Controller, Post, Body } from "@nestjs/common";

import { User } from "./user.model";
import { UserService } from "./user.service";
import { REGISTER } from "./user.routes";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post(REGISTER.ROUTE)
    async register(@Body() payload: User) {
        return await this.userService.register(payload);
    }
}