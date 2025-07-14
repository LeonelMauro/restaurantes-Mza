import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException } from '@nestjs/common';
import { CategoryBebidasService } from './category-bebidas.service';
import { CreateCategoryBebidaDto } from './dto/create-category-bebida.dto';
import { UpdateCategoryBebidaDto } from './dto/update-category-bebida.dto';

@Controller('category-bebidas')
export class CategoryBebidasController {
  constructor(
    private readonly categoryBebidasService :CategoryBebidasService
  ){}

  @Post()
  async create(@Body() createCategoryBebidaDto: CreateCategoryBebidaDto) {
    return await this.categoryBebidasService.create(createCategoryBebidaDto);
  }

  @Get()
  findAll() {
    return this.categoryBebidasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryBebidasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryBebidaDto: UpdateCategoryBebidaDto) {
    return this.categoryBebidasService.update(+id, updateCategoryBebidaDto);
  }

  @Get('restaurante/:id/categorias-con-bebidas')
async getCategoriasConBebida(@Param('id') id: number) {
  try {
    const result = await this.categoryBebidasService.findCategoriasConBebida(id);
    return result;
  } catch (error) {
    console.error("Error en getCategoriasConBebida:", error);
    throw new InternalServerErrorException('Error al obtener categorías con bebidas');
  }
}


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryBebidasService.remove(+id);
  }
}
