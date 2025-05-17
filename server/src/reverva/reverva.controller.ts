import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RevervaService } from './reverva.service';
import { CreateRevervaDto } from './dto/create-reverva.dto';
import { UpdateRevervaDto } from './dto/update-reverva.dto';

@Controller('reverva')
export class RevervaController {
  constructor(private readonly revervaService: RevervaService) {}

  @Post()
  create(@Body() createRevervaDto: CreateRevervaDto) {
    return this.revervaService.create(createRevervaDto);
  }

  @Get()
  findAll() {
    return this.revervaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.revervaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRevervaDto: UpdateRevervaDto) {
    return this.revervaService.update(+id, updateRevervaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.revervaService.remove(+id);
  }
}
