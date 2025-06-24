import { Module } from '@nestjs/common';
import { BebidasService } from './bebidas.service';
import { BebidasController } from './bebidas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bebida } from './entities/bebida.entity';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';

@Module({
   imports: [
      TypeOrmModule.forFeature([Bebida, Restaurante]) // <-- Esto es lo clave
    ],
  controllers: [BebidasController],
  providers: [BebidasService],
})
export class BebidasModule {}
