import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entity/user/user.entity';
import { UserService } from './entity/user/user.service';
import { UserController } from './entity/user/user.controller';
import { Fav } from './entity/fav/fav.entity';
import { FavService } from './entity/fav/fav.service';
import { FavController } from './entity/fav/fav.controller';
import * as ormconfig from '../ormconfig.json';

console.log('TypeORM Configuration:', ormconfig);

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig as TypeOrmModuleOptions),
    TypeOrmModule.forFeature([User, Fav]),
  ],
  controllers: [AppController, UserController, FavController],
  providers: [AppService, UserService, FavService],
})
export class AppModule {}