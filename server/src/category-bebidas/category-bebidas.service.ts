import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryBebidaDto } from './dto/create-category-bebida.dto';
import { UpdateCategoryBebidaDto } from './dto/update-category-bebida.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryBebida } from './entities/category-bebida.entity';
import { Repository } from 'typeorm';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';

@Injectable()
export class CategoryBebidasService {
  constructor(
    @InjectRepository(CategoryBebida)
    private repositoryCategoryBebidas : Repository <CategoryBebida>,
    
    @InjectRepository(Restaurante)
    private repositoryRestaurante: Repository<Restaurante>,
  ){}
  async create(createCategoryBebidaDto: CreateCategoryBebidaDto) {
    const restaurante = await this.repositoryRestaurante.findOne({
      where: {id: createCategoryBebidaDto.restauranteId},
    })
    if (!restaurante){
      throw new NotFoundException( 'Restaurante no encontrado')
    }
    const categoryBebida= await this.repositoryCategoryBebidas.create({
      nombre: createCategoryBebidaDto.nombre,
      restaurante: restaurante,
    })
    return await this.repositoryCategoryBebidas.save(categoryBebida);
  }

  async findAll():Promise<CategoryBebida[]> {
    return await this.repositoryCategoryBebidas.find({
      relations: ['bebidas','restaurante']
    });

  }

  async findOne(id: number):Promise<CategoryBebida> {
    const categoryBebidas= await this.repositoryCategoryBebidas.findOne({
      where: {id},
      relations: ['bebidas', 'restaurante']
    })
    if (!categoryBebidas){
      throw new NotFoundException('Categoria de bebidas no encontrada')
    }
    return categoryBebidas;
  }

  async update(id: number, dto: UpdateCategoryBebidaDto) {
  const categoria = await this.repositoryCategoryBebidas.findOne({ where: { id } });
  if (!categoria) throw new Error('Categoría no encontrada');
  const updated = Object.assign(categoria, dto);
  return await this.repositoryCategoryBebidas.save(updated);
}
  async findCategoriasConBebida(restauranteId: number) {
  return await this.repositoryCategoryBebidas.find({
    where: { restaurante: { id: restauranteId } },
    relations: ['bebidas'],
  });
}


   async remove(id: number) {
    const category= await this.repositoryCategoryBebidas.findOne({
      where: {id}
    });
    if (!category){
      throw new NotFoundException('Categoria no encontrada')
    };
    return await this.repositoryCategoryBebidas.remove(category);
  }
  
}
