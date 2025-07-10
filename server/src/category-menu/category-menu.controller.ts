import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryMenuService } from './category-menu.service';
import { CreateCategoryMenuDto } from './dto/create-category-menu.dto';
import { UpdateCategoryMenuDto } from './dto/update-category-menu.dto';

@Controller('category-menu')
export class CategoryMenuController {
  constructor(private readonly categoryMenuService: CategoryMenuService) {}

  @Post()
  create(@Body() createCategoryMenuDto: CreateCategoryMenuDto) {
    return this.categoryMenuService.create(createCategoryMenuDto);
  }

  @Get()
  findAll() {
    return this.categoryMenuService.findAll();
  }
  
  @Get('by-restaurante/:id')
  findByRestaurante(@Param('id') id: string) {
    return this.categoryMenuService.findByRestauranteId(+id);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryMenuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryMenuDto: UpdateCategoryMenuDto) {
    return this.categoryMenuService.update(+id, updateCategoryMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryMenuService.remove(+id);
  }
}
