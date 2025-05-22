import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { ReseñaService } from './reseña.service';
import { CreateReseñaDto } from './dto/create-reseña.dto';
import { UpdateReseñaDto } from './dto/update-reseña.dto';

@Controller('resenas')
export class ReseñaController {
  constructor(private readonly reseñaService: ReseñaService) {}

  // Crear una reseña
  @Post()
  create(@Body() createReseñaDto: CreateReseñaDto) {
    return this.reseñaService.create(createReseñaDto);
  }

  // Obtener todas las reseñas (opcional)
  @Get()
  findAll() {
    return this.reseñaService.findAll();
  }

  // Obtener reseñas por restaurante
  @Get('restaurante/:id')
  findByRestaurante(@Param('id') id: number) {
    return this.reseñaService.findByRestaurante(+id);
  }

  // Obtener reseñas por usuario (opcional)
  @Get('usuario/:id')
  findByUsuario(@Param('id') id: number) {
    return this.reseñaService.findByUsuario(+id);
  }

  // Actualizar una reseña (opcional)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateReseñaDto: UpdateReseñaDto) {
    return this.reseñaService.update(+id, updateReseñaDto);
  }

  // Eliminar una reseña (opcional)
  @Delete(':id')
  remove(@Param('id') id: string, @Body('userId') userId: number) {
  return this.reseñaService.remove(+id, userId);
}

}
