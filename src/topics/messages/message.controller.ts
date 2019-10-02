import { Controller, Post, Request, Param, Body, Get } from "@nestjs/common";
import { Message } from "./message.model";
import { MessageService } from "./message.service";

@Controller('topics')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Post(':id/message')
    async create(@Request() request, @Param('id') id: string, @Body() payload: Message) {
        return await this.messageService.create(request.user, id, payload);
    }

    @Get(':id/message')
    async fetchByTopicId(@Param('id') id: string) {
        return await this.messageService.fetchByTopicId(id);
    }
}