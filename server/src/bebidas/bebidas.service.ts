import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBebidaDto } from './dto/create-bebida.dto';
import { UpdateBebidaDto } from './dto/update-bebida.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';
import { Repository } from 'typeorm';
import { Bebida } from './entities/bebida.entity';
import { CategoryBebida } from 'src/category-bebidas/entities/category-bebida.entity';

@Injectable()
export class BebidasService {
  constructor(
    @InjectRepository(Restaurante)
    private restauranteRepository: Repository<Restaurante>,

    @InjectRepository(Bebida)
    private bebidaRepository: Repository<Bebida>,

    @InjectRepository(CategoryBebida)
    private categoryRepositortBebidas: Repository<CategoryBebida>

  ){}
   async create(createBebidaDto: CreateBebidaDto) {
    const restaurante= await this.restauranteRepository.findOne({
      where:{id : createBebidaDto.restauranteId},
    })
    if (!restaurante){
      throw new NotFoundException('Restaurante no enontrado')
    }
    const category = await this.categoryRepositortBebidas.findOne({ 
      where: { id: createBebidaDto.categoryBebidaId } });
     if (!category){
      throw new NotFoundException('Categoria no enontrado')};

    const bebida = this.bebidaRepository.create({
      nombre: createBebidaDto.nombre,
      descripcion: createBebidaDto.descripcion,
      precio: createBebidaDto.precio,
      restaurante: restaurante,
      categoryBebidas:category,
    })
    return this.bebidaRepository.save(bebida);
  }

  async findAll() {
  return this.bebidaRepository.find({
    relations: ['restaurante','categoryBebidas'],
  });
}


  findOne(id: number) {
    return `This action returns a #${id} bebida`;
  }

  async update(id: number, updateBebidaDto: UpdateBebidaDto) {
    const bebida = await this.bebidaRepository.findOne({
      where:{ id }, 
      relations:['restaurante', 'categoryBebidas'],
    })
    if (!bebida){
      throw new NotFoundException ('bebeda no encontrada')
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

  async remove(id: number) {
    const bebida= await this.bebidaRepository.findOne({
      where:{id},
      relations:['restaurante']
    })
    if (!bebida){
      throw new NotFoundException(`Bebina no entotrada ${id}`)
    }
    await this.bebidaRepository.remove(bebida)
    return {mesagge:`Bebida eliminada`} ;
  }

  async search(query: string): Promise<Bebida[]> {
    return this.bebidaRepository
      .createQueryBuilder('bebidas')
      .leftJoinAndSelect('categoryBebidas', 'category')
      .where('LOWER(bebidas.nombre) LIKE :query', { query: `%${query.toLowerCase()}%` })
      .orWhere('LOWER(category.nombre) LIKE :query', { query: `%${query.toLowerCase()}%` })
      .getMany();
  }
}
