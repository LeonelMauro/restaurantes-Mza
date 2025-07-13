import { Module } from '@nestjs/common';
import { CategoryBebidasService } from './category-bebidas.service';
import { CategoryBebidasController } from './category-bebidas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryBebida } from './entities/category-bebida.entity';
import { Bebida } from 'src/bebidas/entities/bebida.entity';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CategoryBebida, Bebida, Restaurante,])],
  controllers: [CategoryBebidasController],
  providers: [CategoryBebidasService],
})
export class CategoryBebidasModule {}
