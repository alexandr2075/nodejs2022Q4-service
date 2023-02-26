import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersStore } from '../interfaces/user-storage.interface';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
class InMemoryUserStore implements UsersStore {
  private users: UserEntity[] = [];

  getUsers(): UserEntity[] {
    return this.users;
  }

  findById(id: string): UserEntity | undefined {
    return this.users.find((user) => user.id === id);
  }

  create(params: CreateUserDto): UserEntity {
    const newUser = {
      ...params,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: 0,
    };
    this.users.push(newUser);

    return newUser;
  }

  update(id: string, params: UpdateUserDto): UserEntity {
    const currentUser = this.users.find((user) => user.id === id);
    const updateUser = {
      ...currentUser,
      password: params.newPassword,
    };

    return updateUser;
  }
}

export default InMemoryUserStore;
