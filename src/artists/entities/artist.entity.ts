import { IsUUID } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artist')
export class ArtistEntity {
  @IsUUID()
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @Column()
  user_id: number;
}
