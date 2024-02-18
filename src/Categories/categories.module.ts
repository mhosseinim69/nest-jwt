import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CategoriesController } from "../Categories/categories.controller";
import { CategoriesService } from "../Categories/categories.service";

@Module({
    controllers: [CategoriesController],
    providers: [CategoriesService, PrismaService]
})
export class CategoriesModule { }