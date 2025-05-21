import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurante } from './entities/restaurante.entity';
import { Repository } from 'typeorm';
import { CreateRestauranteDto } from './dto/create-restaurante.dto';
import { User } from 'src/user/entities/user.entity';
import { Photo } from 'src/photos/entities/photo.entity';

@Injectable()
export class RestauranteService {
  constructor(
    @InjectRepository(Restaurante)
    private restauranteRepository: Repository<Restaurante>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}

  async create(dto: CreateRestauranteDto, userId: number, imagePaths: string[]) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['restaurante'],
    });

    if (!user) throw new UnauthorizedException('Usuario no encontrado');
    if (user.tipo !== 'restaurante')
      throw new UnauthorizedException('Solo los dueños de restaurante pueden registrar restaurantes');

    if (user.restaurante)
      throw new UnauthorizedException('Ya tienes un restaurante asociado');

    const newRestaurante = this.restauranteRepository.create({
      ...dto,
      usuario: user,
    });

    const savedRestaurante = await this.restauranteRepository.save(newRestaurante);

    const fotos = imagePaths.map(path => this.photoRepository.create({
      url: path,
      restaurante: savedRestaurante,
    }));

    await this.photoRepository.save(fotos);

    return savedRestaurante;
  }
}
