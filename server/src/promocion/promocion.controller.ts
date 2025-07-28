import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { PromocionService } from './promocion.service';
import { CreatePromocionDto } from './dto/create-promocion.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { UpdatePromocionDto } from './dto/update-promocion.dto';

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
  @Patch(':id')
update(@Param('id', ParseIntPipe) id: number, @Body() updatePromoDto: UpdatePromocionDto) {
  return this.promocionService.updatePromocion(id, updatePromoDto);
}

@Delete(':id')
remove(@Param('id', ParseIntPipe) id: number) {
  return this.promocionService.remove(id);
}

}
