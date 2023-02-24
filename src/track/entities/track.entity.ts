import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity('track')
export class TrackEntity {
  @Generated()
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column()
  artistId: string;

  @Column()
  albumId: string;
}
