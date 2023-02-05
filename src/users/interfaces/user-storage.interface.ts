import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';
import { IUser } from './user.interface';

export interface UsersStore {
  getUsers: () => UserEntity[];
  findById: (id: string) => UserEntity | undefined;
  create: (params: CreateUserDto) => UserEntity;
  update: (id: string, params: UpdateUserDto) => UserEntity;
}
