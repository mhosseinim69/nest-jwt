import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './authentication/auth.module';
import { CategoriesModule } from './Categories/categories.module';

@Module({
  imports: [UsersModule, AuthModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }