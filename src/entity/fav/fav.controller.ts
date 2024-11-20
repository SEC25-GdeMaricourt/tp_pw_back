import { Controller, Get, Post, Body, Param, Delete, ConflictException } from '@nestjs/common';
import { FavService } from './fav.service';
import { Fav } from './fav.entity';

@Controller('favs')
export class FavController {
  constructor(private readonly favService: FavService) {}

  @Get()
  findAll(): Promise<Fav[]> {
    return this.favService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Fav> {
    return this.favService.findOne(id);
  }

  @Get('user/:id_user')
  findAllByUserId(@Param('id_user') id_user: number): Promise<Fav[]> {
    return this.favService.findAllByUserId(id_user);
  }

  @Post()
  async create(@Body() fav: Fav): Promise<Fav> {
    try {
      return await this.favService.create(fav);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.favService.remove(id);
  }
}