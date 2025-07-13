import { Module } from '@nestjs/common';
import { BebidasService } from './bebidas.service';
import { BebidasController } from './bebidas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bebida } from './entities/bebida.entity';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';
import { CategoryBebida } from 'src/category-bebidas/entities/category-bebida.entity';

@Module({
   imports: [
      TypeOrmModule.forFeature([Bebida, Restaurante,CategoryBebida]) // <-- Esto es lo clave
    ],
  controllers: [BebidasController],
  providers: [BebidasService],
})
export class BebidasModule {}
