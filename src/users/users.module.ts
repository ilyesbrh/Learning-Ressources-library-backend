import { LearningResource } from './../ressources/learning-resource.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,LearningResource])],
  providers: [],
  exports: [TypeOrmModule],
})
export class UsersModule { }
