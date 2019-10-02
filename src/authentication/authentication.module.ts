import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { UserModule } from './../users/user.module';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { JWT_SECRET } from './../app.config';

@Module({
    imports: [JwtModule.register({ secret: JWT_SECRET }), UserModule],
    controllers: [AuthenticationController],
    providers: [AuthenticationService],
    exports: [AuthenticationService]
})
export class AuthenticationModule {

}