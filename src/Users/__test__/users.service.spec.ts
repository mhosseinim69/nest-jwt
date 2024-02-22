import { UsersService } from '../users.service';
import { PrismaService } from '../../prisma.service';
import { Users } from '../users.model';
import { Test, TestingModule } from '@nestjs/testing'


export type UserRecive = {
    id: number
    name: string
    password: string
    username: string
    email: string
}

describe('UsersService', () => {
    let usersService: UsersService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersService, PrismaService],
        }).compile();

        usersService = module.get<UsersService>(UsersService);
        prismaService = module.get<PrismaService>(PrismaService);

    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new user', async () => {

        const userData: Users = { name: 'New User', username: 'newuser', email: 'newuser@example.com', password: 'password' };
        const createdUser: UserRecive = { id: 1, ...userData };

        jest.spyOn(prismaService.users, 'findUnique').mockResolvedValue(null);
        jest.spyOn(prismaService.users, 'create').mockResolvedValue(createdUser);

        const result = await usersService.createUser(userData);
        expect(result).toEqual(createdUser);
    })
    it('should retrieve all users ', async () => {

        const users: UserRecive[] = [{ id: 1, name: 'User 1', username: 'user1', email: 'user1@example.com', password: 'password' }];
        jest.spyOn(prismaService.users, 'findMany').mockResolvedValue(users);

        const result = await usersService.getAllUser();
        expect(result).toEqual(users);
    });
});

