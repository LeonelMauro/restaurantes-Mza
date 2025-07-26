import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Post('create')
@UseGuards(JwtAuthGuard)
@UseInterceptors(FileInterceptor('imagen')) // <-- debe coincidir con el nombre en FormData
create(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateEventoDto, @Req() req) {
  // podés hacer: dto.imagenUrl = file.path o guardar en Cloudinary/S3 y setear la URL
  return this.eventosService.create(dto, req.user.id, file);
}


  @Get()
  findAll() {
    return this.eventosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventoDto: UpdateEventoDto) {
    return this.eventosService.update(+id, updateEventoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventosService.remove(+id);
  }
}
