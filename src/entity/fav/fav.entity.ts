import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Fav {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_user: number;

  @Column()
  id_region: string;
}