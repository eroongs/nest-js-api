import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { v1 as v1uuid } from 'uuid';

import { Topic } from "./topic.model";

@Injectable()
export class TopicService {
    private readonly topics: Topic[] = [];

    constructor() { }

    async create(userId: string, payload: Topic): Promise<Topic> {
        const topic: Topic = {
            id: v1uuid(),
            created_by: userId,
            updated_by: userId,
            created_at: new Date(),
            updated_at: new Date(),
            ...payload
        };

        this.topics.push(topic);

        return topic;
    }

    async fetch(): Promise<{ data: Topic[] }> {
        console.log(this.topics);
        return { data: this.topics.filter((topic) => !!!topic.deleted_at) };
    }

    async get(id: string): Promise<Topic> {
        const { topic } = await this.find(id);

        return topic;
    }

    async update(userId: string, id: string, payload: Topic): Promise<Topic> {
        const { index, topic } = await this.find(id);

        if (topic.created_by !== userId) {
            throw new ForbiddenException();
        }

        payload = { ...topic, ...payload, updated_at: new Date() };

        this.topics.splice(index, 1, payload);

        return payload;
    }

    async delete(userId: string, id: string): Promise<{ success: boolean }> {
        const { index, topic } = await this.find(id);

        if (topic.created_by !== userId) {
            throw new ForbiddenException();
        }

        topic.deleted_at = new Date();

        const isDeleted = this.topics.splice(index, 1, topic);

        return { success: isDeleted.length > 0 };
    }

    async find(id: string): Promise<{ index: number, topic: Topic }> {
        const index: number = this.topics.findIndex((topic) => topic.id === id);
        const topic: Topic = this.topics[index];

        if (!topic || !!topic.deleted_at) {
            throw new NotFoundException('Topic does not exists');
        }

        return { index: index, topic: topic };
    }
}