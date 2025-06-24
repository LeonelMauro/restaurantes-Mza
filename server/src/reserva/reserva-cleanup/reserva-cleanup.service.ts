// src/reserva/reserva-cleanup.service.ts

import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from '../entities/reverva.entity';
import { Repository, LessThan } from 'typeorm';

@Injectable()
export class ReservaCleanupService {
  constructor(
    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,
  ) {}

  @Cron('0 0 * * *') // todos los días a la medianoche
  async eliminarReservasPasadas() {
    const ahora = new Date();
    const result = await this.reservaRepository.delete({
      fecha: LessThan(ahora),
    });

    console.log(`🧹 Reservas pasadas eliminadas: ${result.affected}`);
  }
}
