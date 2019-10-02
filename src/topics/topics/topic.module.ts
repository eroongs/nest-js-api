import { NestModule, Module, MiddlewareConsumer } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthenticationMiddleware } from './../../middlewares/authentication.middleware';
import { AuthenticationModule } from './../../authentication/authentication.module';
import { UserModule } from './../../users/user.module';
import { JWT_SECRET } from './../../app.config';
import { TopicController } from "./topic.controller";
import { TopicService } from "./topic.service";

@Module({
    imports: [JwtModule.register({ secret: JWT_SECRET }), UserModule, AuthenticationModule],
    controllers: [TopicController],
    providers: [TopicService],
    exports: [TopicService]
})
export class TopicModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthenticationMiddleware)
            .forRoutes(TopicController)
    }

}