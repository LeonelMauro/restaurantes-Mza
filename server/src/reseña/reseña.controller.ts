import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';

import { ReseñaService } from './reseña.service';
import { CreateReseñaDto } from './dto/create-reseña.dto';
import { UpdateReseñaDto } from './dto/update-reseña.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthRequest } from 'src/auth/interfaces/auth-request.interface';

@Controller('resenas')
export class ReseñaController {
  constructor(
    private readonly reseñaService: ReseñaService,
  ) {}

  // Crear una reseña con el usuario autenticado.
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createReseñaDto: CreateReseñaDto,
    @Req() req: AuthRequest,
  ) {
    const userId = req.user.sub;

    return this.reseñaService.create(
      createReseñaDto,
      userId,
    );
  }

  // Obtener el promedio de puntuación de un restaurante.
  @Get('promedio/:restauranteId')
  getPromedio(
    @Param('restauranteId', ParseIntPipe) restauranteId: number,
  ) {
    return this.reseñaService.obtenerPromedioPorRestaurante(
      restauranteId,
    );
  }

  // Obtener todas las reseñas.
  @Get()
  findAll() {
    return this.reseñaService.findAll();
  }

  // Obtener las reseñas de un restaurante.
  @Get('restaurante/:id')
  findByRestaurante(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.reseñaService.findByRestaurante(id);
  }

  // Obtener las reseñas de un usuario.
  @UseGuards(JwtAuthGuard)
  @Get('usuario/:id')
  findByUsuario(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthRequest,
  ) {
    // Cada usuario solo puede consultar sus propias reseñas.
    if (req.user.sub !== id) {
      // La validación de permisos se debe realizar antes
      // de ejecutar la consulta. Se implementará con una
      // excepción ForbiddenException si se mantiene esta regla.
    }

    return this.reseñaService.findByUsuario(id);
  }

  // Actualizar una reseña propia.
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReseñaDto: UpdateReseñaDto,
    @Req() req: AuthRequest,
  ) {
    const userId = req.user.sub;

    return this.reseñaService.update(
      id,
      updateReseñaDto,
      userId,
    );
  }

  // Eliminar una reseña propia.
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthRequest,
  ) {
    const userId = req.user.sub;

    return this.reseñaService.remove(id, userId);
  }
}