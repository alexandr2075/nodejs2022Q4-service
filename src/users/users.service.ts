import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.usersRepository.save({ ...createUserDto });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async getUserByLogin(login: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({
      where: { login },
    });
  }

  async getOneUser(id: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({
      where: { id },
    });
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.getOneUser(updateUserDto.id);
    if ((user.password = updateUserDto.oldPassword)) {
      return this.usersRepository.save({
        ...user,
        password: updateUserDto.newPassword,
      });
    }
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
  }
}
