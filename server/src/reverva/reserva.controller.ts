import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { Request } from 'express';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { ReservaService } from './reserva.service';

@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

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
  @Get('usuario')
  async obtenerReservasDelUsuario(@Req() req: Request) {
    const userId = req['user'].sub;
    return this.reservaService.findReservasByUsuario(userId);
  }

  @Get('restaurante/:id')
  async obtenerReservasDelRestaurante(@Param('id') restauranteId: number) {
    return this.reservaService.findReservasByRestaurante(restauranteId);
  }
}
