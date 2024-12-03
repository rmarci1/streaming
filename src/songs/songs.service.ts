import { Injectable, Query } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SongsService {
  constructor(public prisma: PrismaService) {}

  async create(createSongDto: CreateSongDto) {
    return this.prisma.songs.create({
      data:createSongDto
    });
  }
  async findAll() {
    return this.prisma.songs.findMany();
  }

  async findOne(id: number) {
    return this.prisma.songs.findUnique({
      where : {id}
    });
  }

  async update(id: number, updateSongDto: UpdateSongDto) {
    return this.prisma.songs.update({
      where: { id },
      data: updateSongDto,
    });
  }

  async remove(id: number) {
    return this.prisma.songs.delete({
      where: { id },
    });
  }
  getFree(){
    return this.prisma.songs.findMany({
      where: { 
        ar : 0
      },
    })
  }
  async topget(@Query() count : number = 10){
    return this.prisma.songs.findMany({
      orderBy: {
        ertekeles: 'desc'
      },
      take: count
    });
  }
  async getPopularArtists() {
    const result = await this.prisma.songs.groupBy({
      by: ['szerzo'],
      _count: {
        szerzo: true,
      },
      orderBy: {
        _count: {
          szerzo: 'desc',
        },
      },
    });

    return result.map(item => ({
      artist: item.szerzo,
      numberOfSongs: item._count.szerzo,
    }));
  }
}
