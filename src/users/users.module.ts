import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import InMemoryUserStore from './store/in-memory.users.storage';

@Module({
  controllers: [UsersController],
  providers: [UsersService, InMemoryUserStore],
})
export class UsersModule {}
