import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  Delete,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { Request } from 'express';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { ReservaService } from './reserva.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from './entities/reverva.entity';
import { Repository } from 'typeorm';
import { EstadoReserva } from './entities/reverva.entity';

@Controller('reserva')
export class ReservaController {
  constructor(
    private readonly reservaService: ReservaService,
    @InjectRepository(Reserva)
  private readonly reservaRepository: Repository<Reserva>,
  )
     {}

  @UseGuards(JwtAuthGuard)
  @Post('crear/:restauranteId')
  async crearReserva(
    @Param('restauranteId') restauranteId: number,
    @Body() createReservaDto: CreateReservaDto,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    return this.reservaService.createReserva(
      restauranteId,
      userId,
      createReservaDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('mis-reservas')
  async obtenerReservasDelUsuario(@Req() req: Request) {
    const userId = req['user'].sub;
    return this.reservaService.findReservasByUsuario(userId);
  }
  @UseGuards(JwtAuthGuard)
  @Get('reservas-recibidas')
  async obtenerReservasRecibidas(@Req() req: Request) {
    const userId = req['user'].sub;
    return this.reservaService.findReservasByPropietario(userId);
  }


  @Get('restaurante/:id')
  async obtenerReservasDelRestaurante(@Param('id') restauranteId: number) {
    return this.reservaService.findReservasByRestaurante(restauranteId);

  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id')id: string){
    return this.reservaService.remove(+id)
  }
  @Patch(':id/asistio')
@UseGuards(JwtAuthGuard)
async marcarComoAsistido(@Param('id') reservaId: number, @Req() req: any) {
  const reserva = await this.reservaRepository.findOne({
    where: { id: reservaId },
    relations: ['restaurante', 'restaurante.usuario'],
  });

  if (!reserva) throw new NotFoundException('Reserva no encontrada');

  if (reserva.restaurante.usuario.id !== req.user.sub) {
    throw new ForbiddenException('No tenés permiso para actualizar esta reserva');
  }

  if (reserva.estado === EstadoReserva.Asistido) {
    throw new BadRequestException('Esta reserva ya fue marcada como asistida');
  }

  reserva.estado = EstadoReserva.Asistido;
  await this.reservaRepository.save(reserva);

  return { mensaje: 'Reserva marcada como asistida', reserva };
}

@Patch(':id/no-asistio')
@UseGuards(JwtAuthGuard)
async marcarComoNoAsistio(@Param('id') reservaId: number, @Req() req: any) {
  const reserva = await this.reservaRepository.findOne({
    where: { id: reservaId },
    relations: ['restaurante', 'restaurante.usuario'],
  });

  if (!reserva) throw new NotFoundException('Reserva no encontrada');

  if (reserva.restaurante.usuario.id !== req.user.id) {
    throw new ForbiddenException('No tenés permiso para actualizar esta reserva');
  }

  if (reserva.estado === EstadoReserva.NoAsistio) {
    throw new BadRequestException('Esta reserva ya fue marcada como no asistida');
  }

  reserva.estado = EstadoReserva.NoAsistio;
  await this.reservaRepository.save(reserva);

  return { mensaje: 'Reserva marcada como no asistida', reserva };
}


}
