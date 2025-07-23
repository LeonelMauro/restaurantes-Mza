import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurante } from './entities/restaurante.entity';
import { Repository } from 'typeorm';
import { CreateRestauranteDto } from './dto/create-restaurante.dto';
import { User } from 'src/user/entities/user.entity';
import { Photo } from 'src/photos/entities/photo.entity';
import { UpdateRestauranteDto } from './dto/update-restaurante.dto';
import { Departamento } from 'src/departamento/entities/departamento.entity';

@Injectable()
export class RestauranteService {
  constructor(
    @InjectRepository(Restaurante)
    private restauranteRepository: Repository<Restaurante>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,

    @InjectRepository(Departamento)
    private departamentoRepository: Repository<Departamento>
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

  // Buscar el departamento
  const { departamentoId, ...restoDatos } = dto;

  const departamento = await this.departamentoRepository.findOne({
    where: { id: departamentoId },
  });

  if (!departamento) {
    throw new NotFoundException('Departamento no encontrado');
  }

  // Crear restaurante con relación al usuario y al departamento
  const newRestaurante = this.restauranteRepository.create({
    ...restoDatos,
    usuario: user,
    departamento,
  });

  const savedRestaurante = await this.restauranteRepository.save(newRestaurante);

  const fotos = imagePaths.map(path => this.photoRepository.create({
    url: path,
    restaurante: savedRestaurante,
  }));

  await this.photoRepository.save(fotos);

  return savedRestaurante;
}


  async findAll(): Promise<Restaurante[]> {
    return this.restauranteRepository.find({
      relations: ['usuario', 'photos'],
    });
  }

  async findOne(id: number): Promise<Restaurante> {
    const restaurante = await this.restauranteRepository.findOne({
      where: { id },
      relations: [
        'usuario',
        'photos',
        'resenas',
        'resenas.usuario',
        'menu',
        'reservas',
        'reservas.usuario',
        'promociones',
        'bebidas',
        'departamento',
      ],
    });

    if (!restaurante) {
      throw new NotFoundException(`Restaurante con id ${id} no encontrado`);
    }

    return restaurante;
  }

  async update(
    id: number,
    updateRestauranteDto: UpdateRestauranteDto,
  ): Promise<Restaurante> {
    const restaurante = await this.restauranteRepository.findOne({
      where: { id },
    });

    if (!restaurante) {
      throw new NotFoundException(`Restaurante con ID ${id} no encontrado`);
    }

    restaurante.nombre = updateRestauranteDto.nombre ?? restaurante.nombre;
    restaurante.descripcion = updateRestauranteDto.descripcion ?? restaurante.descripcion;
    restaurante.direccion = updateRestauranteDto.direccion ?? restaurante.direccion;
    restaurante.horario = updateRestauranteDto.horario ?? restaurante.horario;
    restaurante.contacto = updateRestauranteDto.contacto ?? restaurante.contacto;

    return await this.restauranteRepository.save(restaurante);
  }

  async findByUserId(userId: number): Promise<Restaurante | null> {
    return this.restauranteRepository.findOne({
      where: { usuario: { id: userId } },
      relations: ['usuario'],
    });
  }
  async obtenerRestaurantesConPromedio() {
  const restaurantes = await this.restauranteRepository
    .createQueryBuilder('restaurante')
    .leftJoinAndSelect('restaurante.photos', 'photo')
    .leftJoin('restaurante.resenas', 'resena')
    .addSelect('AVG(resena.puntuacion)', 'promedio')
    .groupBy('restaurante.id')
    .addGroupBy('photo.id')
    .orderBy('promedio', 'DESC') // <- ordenado
    .getRawAndEntities();

  return restaurantes.entities.map((resto, index) => ({
    ...resto,
    promedio: parseFloat(restaurantes.raw[index].promedio) || 0
  }));
}


  async search(query: string): Promise<Restaurante[]> {
    return this.restauranteRepository
      .createQueryBuilder('restaurante')
      .leftJoinAndSelect('restaurante.departamento', 'departamento')
      .leftJoinAndSelect('restaurante.photos', 'photos')
      .where('LOWER(restaurante.nombre) LIKE :query', { query: `%${query.toLowerCase()}%` })
      .orWhere('LOWER(departamento.nombre) LIKE :query', { query: `%${query.toLowerCase()}%` })
      .getMany();
  }

  async findOneByName(name: string): Promise<Restaurante | null> {
    return this.restauranteRepository
      .createQueryBuilder('restaurante')
      .leftJoinAndSelect('restaurante.departamento', 'departamento')
      .leftJoinAndSelect('restaurante.photos', 'photos')
      .where('LOWER(restaurante.nombre) LIKE :name', { name: `%${name.toLowerCase()}%` })
      .getOne();
  }
}
