import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './users/user.module';
import { TopicModule } from './topics/topics/topic.module';
import { MessageModule } from './topics/messages/message.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [AuthenticationModule, UserModule, TopicModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
