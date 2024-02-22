import { Controller, Get, Post, Delete, Body, Param, Req, Res, NotFoundException, HttpStatus, Put, UseGuards } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { Request, Response } from 'express'
import { CreateCategoryDto } from "./dto/create.category.dto";
import { UpdateCategoryDto } from "./dto/update.category.dto";
import { JwtAuthGuard } from "../authentication/auth.guard";
import {
    ApiBearerAuth,
    ApiBody,
    ApiTags,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) { }


    @ApiCreatedResponse({ description: "Category was created" })
    @ApiUnauthorizedResponse({ description: "invalid credentials" })
    @ApiBearerAuth('access-token')
    @ApiBody({
        type: CreateCategoryDto,
    })
    @Post()
    @UseGuards(JwtAuthGuard)

    async createCategory(@Body() createCategoryDto: CreateCategoryDto, @Res() response: Response): Promise<any> {
        try {
            const newCategory = await this.categoryService.createCategory(createCategoryDto);
            return response.status(HttpStatus.CREATED).json({
                status: 'Created!',
                message: 'Category created successfully!',
                result: newCategory
            });
        } catch (err) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'Error',
                message: 'Internal Server Error!',
                error: err.message
            });
        }
    }
    @ApiUnauthorizedResponse({ description: "invalid credentials" })
    @ApiOkResponse({ description: "Category was updated" })
    @ApiBearerAuth('access-token')
    @ApiBody({
        type: UpdateCategoryDto,
    })

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateCategory(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto, @Res() response: Response): Promise<any> {
        try {
            const updatedCategory = await this.categoryService.updateCategory(id, updateCategoryDto);
            if (!updatedCategory) {
                throw new NotFoundException(`Category with ID ${id} not found`);
            }
            return response.status(HttpStatus.OK).json({
                status: 'Ok!',
                message: 'Category updated successfully!',
                result: updatedCategory
            });
        } catch (err) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'Error',
                message: 'Internal Server Error!',
                error: err.message
            });
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiUnauthorizedResponse({ description: "invalid credentials" })
    @ApiOkResponse({ description: "Get all users" })
    async getAllUsers(@Req() request: Request, @Res() response: Response): Promise<any> {
        try {
            const result = await this.categoryService.getAllCategory();
            return response.status(HttpStatus.OK).json({
                status: 'Ok!',
                message: 'Successfully fetch data!',
                result: result
            })
        } catch (err) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'Ok!',
                message: 'Internal Server Error!'
            })
        }
    }


    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiUnauthorizedResponse({ description: "invalid credentials" })
    @ApiOkResponse({ description: "Get user" })
    async getCategoryById(@Param('id') id: number, @Res() response: Response): Promise<any> {
        try {
            const category = await this.categoryService.getCategoryById(id);
            if (!category) {
                throw new NotFoundException(`Category with ID ${id} not found`);
            }
            return response.status(HttpStatus.OK).json({
                status: 'Ok!',
                message: 'Successfully fetch category!',
                result: category
            });
        } catch (err) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'Error',
                message: 'Internal Server Error!',
                error: err.message
            });
        }
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiUnauthorizedResponse({ description: "invalid credentials" })
    @ApiOkResponse({ description: "User was deleted" })
    async deleteCategory(@Param('id') id: number, @Res() response: Response): Promise<any> {
        try {
            const deletedCategory = await this.categoryService.deleteCategory(id);
            if (!deletedCategory) {
                throw new NotFoundException(`Category with ID ${id} not found`);
            }
            return response.status(HttpStatus.OK).json({
                status: 'Ok!',
                message: 'Category deleted successfully!',
                result: deletedCategory
            });
        } catch (err) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'Error',
                message: 'Internal Server Error!',
                error: err.message
            });
        }
    }
}