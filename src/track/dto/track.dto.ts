import { ApiProperty } from '@nestjs/swagger';

export class TrackDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  artistId: string | null;
  @ApiProperty()
  albumId: string | null;
  @ApiProperty()
  duration: number;

  constructor({ id, name, artistId, albumId, duration }: TrackDto) {
    this.id = id;
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }
}
