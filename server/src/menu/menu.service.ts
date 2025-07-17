import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';
import { Repository, Unique } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { CategoryMenu } from 'src/category-menu/entities/category-menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Restaurante)
    private restauranteRepository: Repository<Restaurante>,
    
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,

    @InjectRepository(CategoryMenu)
    private categoryRepository: Repository<CategoryMenu>

  ){}

  async create(createMenuDto: CreateMenuDto) {
  const restaurante = await this.restauranteRepository.findOne({
    where: { id: createMenuDto.restauranteId },
  });

  if (!restaurante) {
    throw new Error('Restaurante no encontrado');
  }
  
  const categoria= await this.categoryRepository.findOne({
    where:{ id: createMenuDto.categoryMenuId}
  })
  if (!categoria){
    throw new Error('Categoría no encontrada');
  }
  
  const menu = this.menuRepository.create({
    nombre: createMenuDto.nombre,
    descripcion: createMenuDto.descripcion,
    precio: createMenuDto.precio,
    restaurante: restaurante,
    categoryMenu: categoria,
  });

  return this.menuRepository.save(menu);
}


  async findAll() {
    return this.menuRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  async updateMenu(id: number, updateMenuDto: UpdateMenuDto) {
    const menu =await this.menuRepository.findOne({
      where:{id},
      relations: ['restaurante'],
    })
    
    if (!menu){
      throw new Error('Cominda no encontrada')
    }
    //Solo se actualiza el dato a modificar

    if (updateMenuDto.nombre !== undefined){
      menu.nombre = updateMenuDto.nombre
    }
    if (updateMenuDto.descripcion !== undefined){
      menu.descripcion= updateMenuDto.descripcion
    }
    if (updateMenuDto.precio !== undefined){
      menu.precio= updateMenuDto.precio
    }

    return this.menuRepository.save(menu);
  }

  async remove(id: number) {
    const menu = await this.menuRepository.findOne({
      where: {id}
    })


    if (!menu){
      throw new Error ('Comida no encontrada')
    }
    
    await this.menuRepository.remove(menu) ;
    return {message :'Comida eliminada correctamente' }
  }
}
