import { IsNumber, IsString, IsOptional } from "class-validator";


export class CreateCategoryDto {

    @IsString()
    name: string;

    @IsNumber()
    score: number;

}