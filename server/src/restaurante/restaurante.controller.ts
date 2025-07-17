import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  UploadedFiles,
  UseInterceptors,
  Get,
  Param,
  Patch,
  Query,
  BadRequestException
} from '@nestjs/common';
import { RestauranteService } from './restaurante.service';
import { CreateRestauranteDto } from './dto/create-restaurante.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { Request } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Restaurante } from './entities/restaurante.entity';
import { UpdateRestauranteDto } from './dto/update-restaurante.dto';

@Controller('restaurante')
export class RestauranteController {
  constructor(private readonly restauranteService: RestauranteService) {}

  // ✅ Crear restaurante (requiere token y fotos)
  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async create(
    @Body() dto: CreateRestauranteDto,
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const userId = req['user'].sub;
    const imagePaths = files.map(file => file.path);
    return this.restauranteService.create(dto, userId, imagePaths);
  }
// Obtener todos
@Get()
async findAll() {
  return this.restauranteService.findAll();
}

// Buscar por texto
@Get('search')
async search(@Query('query') query: string) {
  if (!query || query.trim() === '') return [];
  return this.restauranteService.search(query);
}

// Buscar uno por nombre exacto
@Get('search-one')
async searchOne(@Query('name') name: string): Promise<Restaurante | null> {
  if (!name || name.trim() === '') return null;
  return this.restauranteService.findOneByName(name);
}

// Buscar por userId
@Get('by-user/:userId')
async findByUserId(@Param('userId') userId: number): Promise<Restaurante | null> {
  return this.restauranteService.findByUserId(userId);
}

// 🔥 Este VA AL FINAL para evitar conflictos con rutas como "search"
@Get(':id')
async findOne(@Param('id') id: string): Promise<Restaurante> {
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) throw new BadRequestException('ID inválido');
  return this.restauranteService.findOne(parsedId);
}

}
