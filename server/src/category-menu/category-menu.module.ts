import { Module } from '@nestjs/common';
import { CategoryMenuService } from './category-menu.service';
import { CategoryMenuController } from './category-menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { CategoryMenu } from './entities/category-menu.entity';

@Module({
  imports :[
    TypeOrmModule.forFeature([Restaurante, Menu,CategoryMenu])
  ],
  controllers: [CategoryMenuController],
  providers: [CategoryMenuService],
})
export class CategoryMenuModule {}
