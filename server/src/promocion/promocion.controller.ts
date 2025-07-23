import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PromocionService } from './promocion.service';
import { CreatePromocionDto } from './dto/create-promocion.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';

@Controller('promociones')
export class PromocionController {
  constructor(private readonly promocionService: PromocionService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  crear(@Body() dto: CreatePromocionDto) {
    return this.promocionService.crear(dto);
  }
  

  @Get()
  obtenerTodas() {
    return this.promocionService.obtenerTodas();
  }

  @Get('restaurante/:id')
  obtenerPorRestaurante(@Param('id') id: string) {
    return this.promocionService.obtenerPorRestaurante(Number(id));
  }
}
