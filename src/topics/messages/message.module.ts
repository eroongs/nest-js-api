import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthenticationMiddleware } from './../../middlewares/authentication.middleware';
import { JWT_SECRET } from './../../app.config';
import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";
import { UserModule } from './../../users/user.module';
import { TopicModule } from "../topics/topic.module";
import { AuthenticationModule } from './../../authentication/authentication.module';

@Module({
    imports: [JwtModule.register({ secret: JWT_SECRET }), AuthenticationModule, UserModule, TopicModule],
    controllers: [MessageController],
    providers: [MessageService],
    exports: []
})
export class MessageModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthenticationMiddleware)
            .forRoutes(MessageController)
    }
}