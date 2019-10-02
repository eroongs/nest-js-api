import { Controller, Post, Body, Request, Get, Param, Put, Delete } from "@nestjs/common";
import { Topic } from "./topic.model";
import { TopicService } from "./topic.service";

@Controller('topics')
export class TopicController {
    constructor(private readonly topicService: TopicService) { }

    @Post()
    async create(@Request() request, @Body() payload: Topic) {
        return await this.topicService.create(request.user, payload);
    }

    @Get()
    async fetch() {
        return await this.topicService.fetch();
    }

    @Get(':id')
    async get(@Param('id') id: string) {
        return await this.topicService.get(id);
    }

    @Put(':id')
    async update(@Request() request, @Param('id') id: string, @Body() payload: Topic) {
        return await this.topicService.update(request.user, id, payload);
    }

    @Delete(':id')
    async delete(@Request() request, @Param('id') id: string) {
        return await this.topicService.delete(request.user, id);
    }
}