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
} from '@nestjs/common';
import { RestauranteService } from './restaurante.service';
import { CreateRestauranteDto } from './dto/create-restaurante.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { Request } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Restaurante } from './entities/restaurante.entity';

@Controller('restaurante')
export class RestauranteController {
  constructor(private readonly restauranteService: RestauranteService) {}

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
    const userId = req['user'].sub; // viene del token
    const imagePaths = files.map(file => file.path);

    return this.restauranteService.create(dto, userId, imagePaths);
  }
  @Get()
  async findAll() {
    return this.restauranteService.findAll();
  }
  @Get(':id')
async findOne(@Param('id') id: number): Promise<Restaurante> {
  return this.restauranteService.findOne(id);
}

}
