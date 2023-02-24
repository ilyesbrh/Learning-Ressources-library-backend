import { User } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearningResourceService } from './learning-resource.service';
import { LearningResourceController } from './learning-resource.controller';
import { Module } from '@nestjs/common';
import { LearningResource } from './learning-resource.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [TypeOrmModule.forFeature([LearningResource, User]),MulterModule],
    controllers: [LearningResourceController],
    providers: [LearningResourceService],
})
export class RessourcesModule { }
