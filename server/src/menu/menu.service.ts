import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Restaurante)
    private restauranteRepository: Repository<Restaurante>,
    
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ){}

  async create(createMenuDto: CreateMenuDto) {
  const restaurante = await this.restauranteRepository.findOne({
    where: { id: createMenuDto.restauranteId },
  });

  if (!restaurante) {
    throw new Error('Restaurante no encontrado');
  }

  const menu = this.menuRepository.create({
    nombre: createMenuDto.nombre,
    descripcion: createMenuDto.descripcion,
    precio: createMenuDto.precio,
    restaurante: restaurante,
  });

  return this.menuRepository.save(menu);
}


  async findAll() {
    return this.menuRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
