import { CategoriesService } from '../categories.service';
import { PrismaService } from '../../prisma.service';
import { Categories } from '../category.model';
import { Test, TestingModule } from '@nestjs/testing'


export type CategoryReceive = {
    id: number
    name: string
    score: number
}

describe('UsersService', () => {
    let categoriesService: CategoriesService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CategoriesService, PrismaService],
        }).compile();

        categoriesService = module.get<CategoriesService>(CategoriesService);
        prismaService = module.get<PrismaService>(PrismaService);

    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new category', async () => {

        const categoryData: Categories = { name: 'New User', score: 20 };
        const createdCategory: CategoryReceive = { id: 1, ...categoryData };

        jest.spyOn(prismaService.categories, 'create').mockResolvedValue(createdCategory);

        const result = await categoriesService.createCategory(categoryData);
        expect(result).toEqual(createdCategory);
    })
});

