import { IsNumber, IsString, IsOptional } from "class-validator";


export class UpdateCategoryDto {
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    score?: number;

    @IsOptional()
    @IsString()
    action?: string;
}