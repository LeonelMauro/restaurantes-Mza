// src/reserva/reserva-cleanup.service.ts
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva, EstadoReserva } from '../entities/reverva.entity';
import { Repository, LessThan } from 'typeorm';

@Injectable()
export class ReservaCleanupService {
  constructor(
    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,
  ) {}

  @Cron('*/1 * * * *') // corre cada minuto para testear
  async finalizarReservasPasadas() {
    const ahora = new Date();

    const reservasPasadas = await this.reservaRepository.find({
      where: {
        fecha: LessThan(ahora),
        estado: EstadoReserva.Confirmada, // o también Pendiente si querés finalizar esas
      },
    });

    for (const reserva of reservasPasadas) {
      reserva.estado = EstadoReserva.Finalizada;
      await this.reservaRepository.save(reserva);
    }

    if (reservasPasadas.length > 0) {
      console.log(`✅ Reservas finalizadas: ${reservasPasadas.length}`);
    }
  }
}
