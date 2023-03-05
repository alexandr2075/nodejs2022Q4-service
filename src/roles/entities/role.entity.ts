import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RoleEntity {
  @Generated()
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  value: string;

  @Column()
  description: string;
}
