import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteService } from './restaurante.service';
import { RestauranteController } from './restaurante.controller';
import { Restaurante } from './entities/restaurante.entity';
import { User } from 'src/user/entities/user.entity';
import { Photo } from 'src/photos/entities/photo.entity';
import { Departamento } from 'src/departamento/entities/departamento.entity';
import { CategoryMenu } from 'src/category-menu/entities/category-menu.entity';
import { CategoryBebida } from 'src/category-bebidas/entities/category-bebida.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurante, User, Photo,Departamento,CategoryMenu,CategoryBebida])],
  controllers: [RestauranteController],
  providers: [RestauranteService],
})
export class RestauranteModule {}
