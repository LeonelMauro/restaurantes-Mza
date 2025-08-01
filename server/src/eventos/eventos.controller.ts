import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Post('create')
@UseGuards(JwtAuthGuard)
@UseInterceptors(FileInterceptor('imagen', {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      if (!file) return cb(new Error('No file provided'), '');
      const ext = path.extname(file.originalname);
      const filename = `${uuidv4()}${ext}`;
      cb(null, filename);
    },
  }),
}))
create(
  @Body() dto: CreateEventoDto,
  @UploadedFile() file: Express.Multer.File,
  @Req() req,
)  {
  if (file) {
    // Guardamos solo la ruta relativa para usarla en el frontend
    dto.imagenUrl = `uploads/${file.filename}`;
  }
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
  @Get('restaurante/:id')
findByRestaurante(@Param('id') id: string) {
  return this.eventosService.findByRestaurante(+id);
}

  @Patch(':id')
    @UseInterceptors(
      FileInterceptor('imagen', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const filename = `${uuidv4()}${ext}`;
            cb(null, filename);
          },
        }),
      })
    )
    async update(
      @Param('id') id: string,
      @UploadedFile() file: Express.Multer.File,
      @Body() dto: UpdateEventoDto,
    ) {
      if (file) {
        dto.imagenUrl = file.path; // 👈 Asegurás que se incluya en el DTO
      }
      console.log('Archivo recibido:', file);
  
      return this.eventosService.update(+id, dto);
    }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventosService.remove(+id);
  }
}
