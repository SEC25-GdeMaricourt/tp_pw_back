import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fav } from './fav.entity';

@Injectable()
export class FavService {
  constructor(
    @InjectRepository(Fav)
    private favsRepository: Repository<Fav>,
  ) {}

  findAll(): Promise<Fav[]> {
    return this.favsRepository.find();
  }

  findOne(id: number): Promise<Fav> {
    return this.favsRepository.findOneBy({ id });
  }

  findAllByUserId(id_user: number): Promise<Fav[]> {
    return this.favsRepository.find({ where: { id_user } });
  }

  async create(fav: Fav): Promise<Fav> {
    const existingFav = await this.favsRepository.findOneBy({ id_user: fav.id_user, id_region: fav.id_region });
    if (existingFav) {
      throw new ConflictException('Fav with the same id_user and id_region already exists');
    }
    return this.favsRepository.save(fav);
  }

  async remove(id: number): Promise<void> {
    await this.favsRepository.delete(id);
  }
}