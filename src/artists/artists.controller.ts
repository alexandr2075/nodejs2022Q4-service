import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArtistDto } from './dto/artist.dto';
import { ArtistsService } from './artists.service';
import { ArtistEntity } from './entities/artist.entity';
import { UpdateArtistDto } from './dto/update-artist.dto';

@ApiTags('artists')
@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}
  @Get()
  @ApiResponse({
    type: [ArtistDto],
  })
  @Post()
  create(@Body() createArtistDto: ArtistDto) {
    return this.artistsService.createArtist(createArtistDto);
  }

  @Get()
  findAll(): Promise<ArtistEntity[]> {
    return this.artistsService.getAllArtists();
  }

  @Get()
  findOne(id): Promise<ArtistEntity> {
    return this.artistsService.getOneArtist(id);
  }

  @Patch(':id')
  update(@Body() updateArtistDto: UpdateArtistDto) {
    return this.artistsService.updateArtist(updateArtistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistsService.removeArtist(id);
  }
}
