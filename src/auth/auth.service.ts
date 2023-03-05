import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import * as process from 'process';
import { UserEntity } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dto/user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

type DataRefreshToken = {
  login: string;
  id: string;
  iat: number;
  exp: number;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(userDto: CreateUserDto) {
    this.validateUserDto(userDto);
    const user = await this.validateUser(userDto);
    return this.generateTokenData(user);
  }

  async registration(userDto: CreateUserDto) {
    this.validateUserDto(userDto);
    const candidate = await this.userService.getUserByLogin(userDto.login);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким логином уже существует.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const salt = await bcrypt.genSalt(Number(process.env.CRYPT_SALT));
    const hashPassword = await bcrypt.hash(userDto.password, salt);

    await this.userService.create({
      ...userDto,
      password: hashPassword,
    });
    return 'Пользователь создан.';
  }

  async updateToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const token = refreshTokenDto.refresh_token;
      const user = this.jwtService.verify(token);
      if (Date.now() / 1000 >= user.exp) {
        throw new HttpException(
          'Время действия токена истекло.',
          HttpStatus.BAD_REQUEST,
        );
      }

      return this.generateTokenData(user);
    } catch (err) {
      throw new Error(err);
    }
  }

  private async generateTokenData(user: UserEntity | DataRefreshToken) {
    const payload = { login: user.login, id: user.id };

    const access_token = this.jwtService.sign(payload, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return { access_token, refresh_token };
  }

  private validateUserDto(userDto: UserDto) {
    const { login, password } = userDto;
    if (
      !login ||
      !password ||
      typeof login !== 'string' ||
      typeof password !== 'string'
    ) {
      throw new HttpException(
        'Отсутствует логин или пароль или не являются строкой.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async validateUser(userDto: UserDto) {
    const user = await this.userService.getUserByLogin(userDto.login);
    if (!user) {
      throw new ForbiddenException({
        message: 'Некорректный логин.',
      });
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (passwordEquals) {
      return user;
    }
    throw new ForbiddenException({
      message: 'Некорректный пароль.',
    });
  }
}
