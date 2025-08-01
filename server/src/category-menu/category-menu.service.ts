import { Injectable } from '@nestjs/common';
import { CreateCategoryMenuDto } from './dto/create-category-menu.dto';
import { UpdateCategoryMenuDto } from './dto/update-category-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryMenu } from './entities/category-menu.entity';
import { Repository } from 'typeorm';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';

@Injectable()
export class CategoryMenuService {
  constructor(
    @InjectRepository(CategoryMenu)
    private repositorymenu:Repository <CategoryMenu>,

    @InjectRepository(Restaurante)
    private repositiryRestaurante: Repository <Restaurante>
  ){}
  async create(createCategoryMenuDto: CreateCategoryMenuDto) {
    const restaurante= await this.repositiryRestaurante.findOne({
      where: {id: createCategoryMenuDto.restauranteId}
    })
    if(!restaurante){
      throw new Error (' Restaurante no encontrado');
    }
    const categoryMenu= await this.repositorymenu.create({
      nombre: createCategoryMenuDto.nombre,
      restaurante: restaurante
    })
    return await this.repositorymenu.save(categoryMenu);
  }

  findAll() {
    return this.repositorymenu.find({ relations: ['restaurante'] });
  }

  async findOne(id: number) {
    const categoryMenu= await this.repositorymenu.findOne({
      where: {id},
      relations:['menus',
        'menus.nombre',
        'menus.descripcion',
        'menus.precio'
      ]
    })
    return categoryMenu;
  }

  async findByRestauranteId(restauranteId: number) {
  return await this.repositorymenu.find({
    where: { restaurante: { id: restauranteId } },
    relations: ['restaurante'], // opcional si querés traer info del restaurante
  });
}
  async findCategoriasConMenus(restauranteId: number) {
  return await this.repositorymenu.find({
    where: { restaurante: { id: restauranteId } },
    relations: ['menus'],
  });
}


  update(id: number, updateCategoryMenuDto: UpdateCategoryMenuDto) {
    return `This action updates a #${id} categoryMenu`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryMenu`;
  }
}
