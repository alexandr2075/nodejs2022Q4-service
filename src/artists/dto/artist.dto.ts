import { ApiProperty } from "@nestjs/swagger";

export class ArtistDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
  grammy: boolean;

  constructor({ id, name, grammy }: ArtistDto) {
    this.id = id;
    this.name = name;
    this.grammy = grammy;
  }
}
