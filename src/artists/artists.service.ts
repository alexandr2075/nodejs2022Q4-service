import { Injectable } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async createArtist(artistDto: ArtistDto): Promise<ArtistEntity> {
    return await this.artistRepository.save({ ...artistDto });
  }
  async getAllArtists(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find();
  }

  async getOneArtist(id: string): Promise<ArtistEntity> {
    return await this.artistRepository.findOneBy({ id });
  }

  async updateArtist(updateArtistDto: UpdateArtistDto): Promise<ArtistEntity> {
    const artist = this.getOneArtist(updateArtistDto.id);
    return await this.artistRepository.save({
      ...artist,
      ...updateArtistDto,
    });
  }

  async removeArtist(id: string): Promise<string> {
    await this.artistRepository.delete({ id });
    return id;
  }
}
