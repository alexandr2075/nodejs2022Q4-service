import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArtistDto } from './dto/artist.dto';
import { ArtistsService } from './artists.service';
import { ArtistEntity } from './entities/artist.entity';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('artist')
@UseGuards(JwtAuthGuard)
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

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
