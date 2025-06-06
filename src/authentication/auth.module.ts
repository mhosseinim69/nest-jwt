import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../Users/users.service';
import { UsersModule } from '../Users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';




@Module({
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JwtStrategy, UsersService],
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        })
    ]
})
export class AuthModule { }