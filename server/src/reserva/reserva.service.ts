// src/reserva/reserva.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';
import { User } from 'src/user/entities/user.entity';
import { Reserva } from './entities/reverva.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,

    @InjectRepository(Restaurante)
    private restauranteRepository: Repository<Restaurante>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createReserva(
    restauranteId: number,
    userId: number,
    createReservaDto: CreateReservaDto,
  ) {
    const restaurante = await this.restauranteRepository.findOneBy({ id: restauranteId });
    if (!restaurante) throw new NotFoundException('Restaurante no encontrado');

    const usuario = await this.userRepository.findOneBy({ id: userId });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const reserva = this.reservaRepository.create({
      ...createReservaDto,
      restaurante,
      usuario,
    });

    return await this.reservaRepository.save(reserva);
  }

  async findReservasByUsuario(userId: number) {
    return this.reservaRepository.find({
      where: { usuario: { id: userId } },
      relations: ['restaurante'],
    });
  }

  async findReservasByRestaurante(restauranteId: number) {
    return this.reservaRepository.find({
      where: { restaurante: { id: restauranteId } },
      relations: ['usuario'],
    });
  }
}
