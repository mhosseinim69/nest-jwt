import { IsNumber, IsString, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class UpdateCategoryDto {

    @ApiProperty({
        example: 'category',
        required: false
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
        example: '20',
        required: false
    })
    @IsOptional()
    @IsNumber()
    score?: number;

    @ApiProperty({
        example: 'increment or decrement',
        required: false
    })
    @IsOptional()
    @IsString()
    action?: string;
}