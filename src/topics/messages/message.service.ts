import { Injectable } from "@nestjs/common";
import { Message } from "./message.model";
import { v1 as v1uuid } from 'uuid';
import { TopicService } from "../topics/topic.service";

@Injectable()
export class MessageService {
    private readonly messages: Message[] = [];

    constructor(private readonly topicService: TopicService) { }

    async create(userId: string, topicId: string, payload: Message): Promise<Message> {
        const { topic } = await this.topicService.find(topicId)

        const message: Message = {
            id: v1uuid(),
            topic_id: topic.id,
            created_by: userId,
            updated_by: userId,
            created_at: new Date(),
            updated_at: new Date(),
            ...payload
        };

        this.messages.push(message);

        return message;
    }

    async fetchByTopicId(id: string) {
        const { topic } = await this.topicService.find(id);

        return [{ data: this.messages.filter((message) => message.topic_id === topic.id) }];
    }


}