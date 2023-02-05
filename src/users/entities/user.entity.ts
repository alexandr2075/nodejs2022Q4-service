import { IsUUID } from 'class-validator';

export class UserEntity {
  @IsUUID()
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
