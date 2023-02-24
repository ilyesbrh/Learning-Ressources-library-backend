import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { LearningResource } from './learning-resource.entity';

@Injectable()
export class LearningResourceService {
    constructor(
        @InjectRepository(LearningResource)
        private readonly learningResourceRepository: Repository<LearningResource>,
    ) { }

    async create(learningResource: LearningResource): Promise<InsertResult> {
        return await this.learningResourceRepository.insert(learningResource);
    }

    async findAll(userId: number): Promise<LearningResource[]> {
        return await this.learningResourceRepository.find({ where: { userId } });
    }

    async findOne(id: number, userId: number): Promise<LearningResource> {
        return await this.learningResourceRepository.findOne({ where: { id, userId } });
    }

    async update(id: number, userId: number, learningResource: LearningResource): Promise<LearningResource> {
        await this.learningResourceRepository.update({ id }, learningResource);
        return await this.learningResourceRepository.findOne({ where: { id, userId } });
    }

    async remove(id: number): Promise<void> {
        await this.learningResourceRepository.delete(id);
    }
}