import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class CreateCategoryDto {

    @ApiProperty({
        example: 'category',
        required: false
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: '20',
        required: false
    })
    @IsNumber()
    score: number;

}