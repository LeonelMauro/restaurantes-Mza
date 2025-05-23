import { Module } from '@nestjs/common';
import { ReservaController } from './reserva.controller';
import { ReservaService } from './reserva.service';
import { Reserva } from './entities/reverva.entity';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
        TypeOrmModule.forFeature([User, Restaurante,Reserva]) // <-- Esto es lo clave
      ],
  controllers: [ReservaController],
  providers: [ReservaService],
})
export class ReservaModule {}
