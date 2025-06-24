import { Injectable } from '@nestjs/common';
import { CreateBebidaDto } from './dto/create-bebida.dto';
import { UpdateBebidaDto } from './dto/update-bebida.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';
import { Repository } from 'typeorm';
import { Bebida } from './entities/bebida.entity';

@Injectable()
export class BebidasService {
  constructor(
    @InjectRepository(Restaurante)
    private restauranteRepository: Repository<Restaurante>,

    @InjectRepository(Bebida)
    private bebidaRepository: Repository<Bebida>

  ){}
   async create(createBebidaDto: CreateBebidaDto) {
    const restaurante= await this.restauranteRepository.findOne({
      where:{id : createBebidaDto.restauranteId},
    })
    if (!restaurante){
      throw new Error('Restaurante no enontrado')
    }
    const bebida = this.bebidaRepository.create({
      nombre: createBebidaDto.nombre,
      descripcion: createBebidaDto.descripcion,
      precio: createBebidaDto.precio,
      restaurante: restaurante,
    })
    return this.bebidaRepository.save(bebida);
  }

  async findAll() {
  return this.bebidaRepository.find({
    relations: ['restaurante'],
  });
}


  findOne(id: number) {
    return `This action returns a #${id} bebida`;
  }

  async update(id: number, updateBebidaDto: UpdateBebidaDto) {
    const bebida = await this.bebidaRepository.findOne({
      where:{ id }, 
      relations:['restaurante'],
    })
    if (!bebida){
      throw new Error ('bebeda no encontrada')
    }
    /// Solo actualiza si el campo fue enviado
  if (updateBebidaDto.nombre !== undefined) {
    bebida.nombre = updateBebidaDto.nombre;
  }

  if (updateBebidaDto.descripcion !== undefined) {
    bebida.descripcion = updateBebidaDto.descripcion;
  }

  if (updateBebidaDto.precio !== undefined) {
    bebida.precio = updateBebidaDto.precio;
  }

  return this.bebidaRepository.save(bebida);
  }

  remove(id: number) {
    return `This action removes a #${id} bebida`;
  }
}
