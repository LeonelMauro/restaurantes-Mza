import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';

@Module({
   imports: [
    TypeOrmModule.forFeature([Menu, Restaurante]) // <-- Esto es lo clave
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
