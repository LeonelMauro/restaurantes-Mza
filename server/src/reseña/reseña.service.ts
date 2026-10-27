import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';

import { CreateReseñaDto } from './dto/create-reseña.dto';
import { UpdateReseñaDto } from './dto/update-reseña.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';
import { User } from 'src/user/entities/user.entity';
import { Reseña } from './entities/reseña.entity';
import { In, LessThan, Repository } from 'typeorm';

import { Reserva } from 'src/reserva/entities/reverva.entity';
import { EstadoReserva } from 'src/reserva/entities/reverva.entity';

@Injectable()
export class ReseñaService {
  constructor(
    @InjectRepository(Restaurante)
    private restauranteRepository: Repository<Restaurante>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Reseña)
    private reseñaRepository: Repository<Reseña>,

    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,
  ) {}

  // Crear una reseña utilizando el ID del usuario autenticado.
  async create(
    createReseñaDto: CreateReseñaDto,
    userId: number,
  ) {
    const { restauranteId, puntuacion, comentario } = createReseñaDto;

    const restaurante = await this.restauranteRepository.findOne({
      where: { id: restauranteId },
    });

    if (!restaurante) {
      throw new NotFoundException('Restaurante no encontrado');
    }

    // El usuario se obtiene desde el JWT, no desde el DTO.
    const usuario = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Comprobar que exista una reserva válida y pasada.
    const reservaValida = await this.reservaRepository.findOne({
      where: {
        usuario: { id: userId },
        restaurante: { id: restauranteId },
        estado: In([
          EstadoReserva.Confirmada,
          EstadoReserva.Asistido,
        ]),
        fecha: LessThan(new Date()),
      },
    });

    if (!reservaValida) {
      throw new BadRequestException(
        'Solo podés dejar una reseña si reservaste y asististe al restaurante',
      );
    }

    // Evitar reseñas duplicadas del mismo usuario.
    const yaComento = await this.reseñaRepository.findOne({
      where: {
        usuario: { id: userId },
        restaurante: { id: restauranteId },
      },
    });

    if (yaComento) {
      throw new BadRequestException(
        'Ya realizaste una reseña para este restaurante',
      );
    }

    const resena = this.reseñaRepository.create({
      puntuacion,
      comentario,
      restaurante,
      usuario,
    });

    return this.reseñaRepository.save(resena);
  }

  // Obtener el promedio de puntuación del restaurante.
  async obtenerPromedioPorRestaurante(restauranteId: number) {
    const resultado = await this.reseñaRepository
      .createQueryBuilder('resena')
      .select('AVG(resena.puntuacion)', 'promedio')
      .where('resena.restauranteId = :restauranteId', {
        restauranteId,
      })
      .getRawOne();

    return {
      restauranteId,
      promedio: Number(resultado?.promedio) || 0,
    };
  }

  // Obtener todas las reseñas.
  async findAll() {
    return this.reseñaRepository.find({
      relations: ['restaurante', 'usuario'],
      order: { fecha: 'DESC' },
    });
  }

  // Obtener las reseñas de un restaurante.
  async findByRestaurante(restauranteId: number) {
    return this.reseñaRepository.find({
      where: { restaurante: { id: restauranteId } },
      relations: ['usuario'],
      order: { fecha: 'DESC' },
    });
  }

  // Obtener las reseñas de un usuario.
  async findByUsuario(userId: number) {
    return this.reseñaRepository.find({
      where: { usuario: { id: userId } },
      relations: ['restaurante'],
      order: { fecha: 'DESC' },
    });
  }

  // Actualizar una reseña propia.
  async update(
    id: number,
    updateReseñaDto: UpdateReseñaDto,
    userId: number,
  ) {
    const reseña = await this.reseñaRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });

    if (!reseña) {
      throw new NotFoundException('Reseña no encontrada');
    }

    // Verificar que la reseña pertenezca al usuario autenticado.
    if (reseña.usuario.id !== userId) {
      throw new ForbiddenException(
        'No tenés permiso para editar esta reseña',
      );
    }

    reseña.puntuacion =
      updateReseñaDto.puntuacion ?? reseña.puntuacion;

    reseña.comentario =
      updateReseñaDto.comentario ?? reseña.comentario;

    return this.reseñaRepository.save(reseña);
  }

  // Eliminar una reseña propia.
  async remove(id: number, userId: number) {
    const reseña = await this.reseñaRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });

    if (!reseña) {
      throw new NotFoundException('Reseña no encontrada');
    }

    if (reseña.usuario.id !== userId) {
      throw new ForbiddenException(
        'No tenés permiso para eliminar esta reseña',
      );
    }

    await this.reseñaRepository.remove(reseña);

    return {
      message: 'Reseña eliminada correctamente',
    };
  }
}