import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { MyLogger } from '../logger/MyLogger';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private myLogger: MyLogger,
  ) {
    this.myLogger.setContext('UsersService');
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.usersRepository.save({ ...createUserDto });
  }

  async getAllUsers(req, res): Promise<UserEntity[]> {
    await this.myLogger.customLog({
      reqParam: [req.url, req.queries, req.body],
      status: res.statusCode,
    });
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
