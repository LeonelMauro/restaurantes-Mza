import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Promocion } from './entities/promocion.entity';
import { Repository } from 'typeorm';
import { CreatePromocionDto } from './dto/create-promocion.dto';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';

@Injectable()
export class PromocionService {
  constructor(
    @InjectRepository(Promocion)
    private readonly promocionRepository: Repository<Promocion>,

    @InjectRepository(Restaurante)
    private readonly restauranteRepository: Repository<Restaurante>,
  ) {}

  async crear(dto: CreatePromocionDto): Promise<Promocion> {
    const restaurante = await this.restauranteRepository.findOne({
      where: { id: dto.restauranteId },
    });

    if (!restaurante) throw new Error('Restaurante no encontrado');

    const promocion = this.promocionRepository.create({
      ...dto,
      restaurante,
    });

    return this.promocionRepository.save(promocion);
  }

  async obtenerTodas(): Promise<Promocion[]> {
    return this.promocionRepository.find({
      relations: ['restaurante'],
      order: { fechaInicio: 'DESC' },
    });
  }

  async obtenerPorRestaurante(restauranteId: number): Promise<Promocion[]> {
    return this.promocionRepository.find({
      where: { restaurante: { id: restauranteId } },
      relations: ['restaurante'],
    });
  }
}
