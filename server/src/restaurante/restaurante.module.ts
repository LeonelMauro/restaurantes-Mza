import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteService } from './restaurante.service';
import { RestauranteController } from './restaurante.controller';
import { Restaurante } from './entities/restaurante.entity';
import { User } from 'src/user/entities/user.entity';
import { Photo } from 'src/photos/entities/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurante, User, Photo])],
  controllers: [RestauranteController],
  providers: [RestauranteService],
})
export class RestauranteModule {}
