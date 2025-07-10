import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import path from 'path';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository:Repository <Photo>,
    @InjectRepository(Restaurante)
    private restauranteRepository: Repository <Restaurante>,
  ){}
  async subirFotos(id: number, images: Express.Multer.File[]) {
  const restaurante = await this.restauranteRepository.findOneBy({ id });

  if (!restaurante) {
    throw new NotFoundException(`Restaurante con ID ${id} no encontrado`);
  }

  const nuevasFotos = images.map((img) =>
    this.photoRepository.create({
      url: `uploads/${img.filename}`,
      restaurante,
    })
  );

  return this.photoRepository.save(nuevasFotos);
}


  findAll() {
    return `This action returns all photos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} photo`;
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return `This action updates a #${id} photo`;
  }

  async remove(id: number): Promise<string> {
  const photo = await this.photoRepository.findOne({ where: { id } });

  if (!photo) {
    throw new NotFoundException(`Foto con ID ${id} no encontrada`);
  }

  await this.photoRepository.remove(photo);

  return `Foto con ID ${id} eliminada correctamente.`;
}

}
