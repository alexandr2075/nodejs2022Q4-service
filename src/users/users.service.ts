import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersStore } from './interfaces/user-storage.interface';
import InMemoryUserStore from './store/in-memory.users.storage';

@Injectable()
export class UsersService {
  constructor(private storage: InMemoryUserStore) {}

  create(createUserDto: CreateUserDto) {
    return this.storage.create(createUserDto);
  }

  findAll() {
    return this.storage.getUsers();
  }

  findOne(id: string) {
    return this.storage.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.storage.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
