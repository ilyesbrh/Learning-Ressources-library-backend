import { InsertResult } from 'typeorm';
import { ApiTags, ApiSecurity, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Request,
    UseInterceptors,
    UploadedFile,
    UseGuards,
    FileTypeValidator,
    MaxFileSizeValidator,
    ParseFilePipe,
    BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LearningResource } from './learning-resource.entity';
import { LearningResourceService } from './learning-resource.service';
import { AuthGuard } from '@nestjs/passport';
import { LearningResourceDTO } from './learning-resourceDTO';

@ApiTags('Learning ressources')
@Controller('learning-resources')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class LearningResourceController {
    constructor(private readonly learningResourceService: LearningResourceService) { }

    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image', {
        dest: 'uploads/'
    }))
    async create(
        @Request() req: any,
        @Body() learningResource: LearningResourceDTO,
        @UploadedFile(new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 1000000 }),
                new FileTypeValidator({ fileType: 'image/jpeg' }),
            ],
        })) file: any): Promise<LearningResource> {

        try {

            learningResource.image = file.path;

            const res = await this.learningResourceService.create({
                ...learningResource,
                user: req.userObj,
                userId: req.userObj.id,
                startDate: new Date(learningResource.startDate),
                endDate: new Date(learningResource.endDate),
            });

            return await this.learningResourceService.findOne(res.raw.id, req.userObj.id);
        } catch (error) {
            throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Ops something went wrong..' })
        }
    }

    @Get()
    async findAll(@Request() req: any): Promise<LearningResource[]> {
        return await this.learningResourceService.findAll(req.userObj.id);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Request() req: any): Promise<LearningResource> {
        try {
            return await this.learningResourceService.findOne(+id, req.userObj.id);
        } catch (error) {
            throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Ops something went wrong..' })
        }
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() learningResource: LearningResourceDTO,
        @Request() req: any
    ): Promise<LearningResource> {

        try {
            return await this.learningResourceService.update(+id, req.userObj.id, {
                ...learningResource,
                user: req.userObj,
                userId: req.userObj.id
            });

        } catch (error) {
            throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Ops something went wrong..' })
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Request() req: any): Promise<void> {
        return await this.learningResourceService.remove(+id);
    }
}



