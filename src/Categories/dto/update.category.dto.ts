import { IsNumber, IsString, IsOptional } from "class-validator";


export class UpdateCategoryDto {

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    score?: number;

    @IsOptional()
    @IsString()
    action?: string;
}