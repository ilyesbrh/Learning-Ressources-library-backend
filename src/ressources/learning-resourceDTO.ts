import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class LearningResourceDTO {

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    startDate: Date;

    @ApiProperty()
    endDate: Date;

    @IsOptional()
    @ApiProperty({ type: 'string', format: 'binary', required: false })
    image: string;
}

