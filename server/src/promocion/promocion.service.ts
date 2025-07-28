import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Promocion } from './entities/promocion.entity';
import { Repository } from 'typeorm';
import { CreatePromocionDto } from './dto/create-promocion.dto';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';
import { UpdatePromocionDto } from './dto/update-promocion.dto';

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
    console.log(dto.precio);
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
  async updatePromocion(id: number, updatePromoDto: UpdatePromocionDto) {
      const promo =await this.promocionRepository.findOne({
        where:{id},
        relations: ['restaurante'],
      })
      
      if (!promo){
        throw new NotFoundException('Promocion no encontrada')
      }
      //Solo se actualiza el dato a modificar
  
      if (updatePromoDto.titulo !== undefined){
        promo.titulo = updatePromoDto.titulo
      }
      if (updatePromoDto.descripcion !== undefined){
        promo.descripcion= updatePromoDto.descripcion
      }
      if (updatePromoDto.fechaInicio !== undefined) {
       promo.fechaInicio = new Date(updatePromoDto.fechaInicio);
      }

      if (updatePromoDto.fechaFin !== undefined) {
        promo.fechaFin = new Date(updatePromoDto.fechaFin);
      }
      if (updatePromoDto.precio !== undefined){
        promo.precio= updatePromoDto.precio
      }
  
      return this.promocionRepository.save(promo);
    }
    async remove(id: number) {
    const promo = await this.promocionRepository.findOne({
      where: {id}
    })
    if (!promo){
      throw new NotFoundException ('Promocion no encontrada')
    }
    
    await this.promocionRepository.remove(promo) ;
    return {message :'Promo eliminada correctamente' }
  }
}
