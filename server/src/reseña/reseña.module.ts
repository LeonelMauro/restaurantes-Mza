import { Module } from '@nestjs/common';
import { ReseñaService } from './reseña.service';
import { ReseñaController } from './reseña.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';
import { Reseña } from './entities/reseña.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([User, Restaurante,Reseña]) // <-- Esto es lo clave
    ],
  controllers: [ReseñaController],
  providers: [ReseñaService],
})
export class ReseñaModule {}
