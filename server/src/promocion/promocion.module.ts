import { Module } from '@nestjs/common';
import { PromocionService } from './promocion.service';
import { PromocionController } from './promocion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promocion } from './entities/promocion.entity';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';

@Module({
  imports: [
        TypeOrmModule.forFeature([ Restaurante,Promocion]) // <-- Esto es lo clave
      ],
  controllers: [PromocionController],
  providers: [PromocionService],
})
export class PromocionModule {}
