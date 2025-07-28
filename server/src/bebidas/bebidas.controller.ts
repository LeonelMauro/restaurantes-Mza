import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { BebidasService } from './bebidas.service';
import { CreateBebidaDto } from './dto/create-bebida.dto';
import { UpdateBebidaDto } from './dto/update-bebida.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';

@Controller('bebidas')
export class BebidasController {
  constructor(private readonly bebidasService: BebidasService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createBebidaDto: CreateBebidaDto) {
    return this.bebidasService.create(createBebidaDto);
  }

  @Get()
  findAll() {
    return this.bebidasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bebidasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBebidaDto: UpdateBebidaDto) {
    return this.bebidasService.update(+id, updateBebidaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bebidasService.remove(+id);
  }

  @Get('search')
async search(@Query('query') query: string) {
  if (!query || query.trim() === '') return [];
  return this.bebidasService.search(query);
}

}
