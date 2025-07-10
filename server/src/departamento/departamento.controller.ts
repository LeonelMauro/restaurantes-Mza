import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, BadRequestException } from '@nestjs/common';
import { DepartamentoService } from './departamento.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import {  FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('departamento')
export class DepartamentoController {
  constructor(private readonly departamentoService: DepartamentoService) {}

  @Post()
@UseInterceptors(
  FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/departamentos',
      filename: (req, file, cb) => {
        const ext = extname(file.originalname);
        cb(null, `departamento-${Date.now()}${ext}`);
      },
    }),
  }),
)
async create(
  @UploadedFile() file: Express.Multer.File,
  @Body() dto: CreateDepartamentoDto,
) {
  console.log('DTO recibido:', dto);
  console.log('Archivo recibido:', file?.path);

  if (!file) {
    throw new BadRequestException('Imagen requerida');
  }

return this.departamentoService.create(dto, file?.path);


}

      

  @Get()
  findAll() {
    return this.departamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.departamentoService.findOne(+id);
  }

 @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/departamentos',
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          cb(null, `departamento-${Date.now()}${ext}`);
        },
      }),
    })
  )
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateDepartamentoDto,
  ) {
    if (file) {
      dto.imagenUrl = file.path; // 👈 Asegurás que se incluya en el DTO
    }
    console.log('Archivo recibido:', file);

    return this.departamentoService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departamentoService.remove(+id);
  }
}
