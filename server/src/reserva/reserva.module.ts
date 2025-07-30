import { Module } from '@nestjs/common';
import { ReservaController } from './reserva.controller';
import { ReservaService } from './reserva.service';
import { Reserva } from './entities/reverva.entity';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaCleanupService } from './reserva-cleanup/reserva-cleanup.service';
import { Evento } from 'src/eventos/entities/evento.entity';

@Module({
  imports: [
        TypeOrmModule.forFeature([User, Restaurante,Reserva,Evento]) // <-- Esto es lo clave
      ],
  controllers: [ReservaController],
  providers: [ReservaService, ReservaCleanupService],
})
export class ReservaModule {}
