import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateReseñaDto } from './dto/create-reseña.dto';
import { UpdateReseñaDto } from './dto/update-reseña.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';
import { User } from 'src/user/entities/user.entity';
import { Reseña } from './entities/reseña.entity';
import { In, LessThan, Repository } from 'typeorm';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { Reserva } from 'src/reserva/entities/reverva.entity';
import { EstadoReserva } from 'src/reserva/entities/reverva.entity'; // Asegurate de importar esto

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

  ){}

  @UseGuards(JwtAuthGuard)
  async create(CreateReseñaDto: CreateReseñaDto) {
  const { restauranteId, userId, puntuacion, comentario } = CreateReseñaDto;

  const restaurante = await this.restauranteRepository.findOne({
    where: { id: restauranteId },
  });
  if (!restaurante) {
    throw new NotFoundException('Restaurante no encontrado');
  }

  const usuario = await this.userRepository.findOne({
    where: { id: userId },
  });
  if (!usuario) {
    throw new NotFoundException('Usuario no encontrado');
  }

  // ✅ Validar que haya una reserva confirmada o asistida
  const reservaValida = await this.reservaRepository.findOne({
  where: {
    usuario: { id: userId },
    restaurante: { id: restauranteId },
    estado: In([EstadoReserva.Confirmada, EstadoReserva.Asistido]), // 🟢 Usar enum
    fecha: LessThan(new Date()), // Solo fechas pasadas
  },
});

  if (!reservaValida) {
    throw new Error(
      'Solo podés dejar una reseña si reservaste y asististe al restaurante',
    );
  }

  // ❗ Opcional: Verificar si ya hizo reseña para este restaurante
  const yaComento = await this.reseñaRepository.findOne({
    where: {
      usuario: { id: userId },
      restaurante: { id: restauranteId },
    },
  });

  if (yaComento) {
    throw new Error('Ya realizaste una reseña para este restaurante.');
  }

  const resena = this.reseñaRepository.create({
    puntuacion,
    comentario,
    restaurante,
    usuario,
  });

  return this.reseñaRepository.save(resena);
}

  async obtenerPromedioPorRestaurante(restauranteId: number) {
  const resultado = await this.reseñaRepository
    .createQueryBuilder('resena')
    .select('AVG(resena.puntuacion)', 'promedio')
    .where('resena.restauranteId = :restauranteId', { restauranteId })
    .getRawOne();

  return {
    restauranteId,
    promedio: parseFloat(resultado.promedio) || 0,
  };
}


   async findAll() {
    return this.reseñaRepository.find({
      relations: ['restaurante', 'usuario'],
      order: { fecha: 'DESC' },
    });
  }

  async findByRestaurante(restauranteId: number) {
    return this.reseñaRepository.find({
      where: { restaurante: { id: restauranteId } },
      relations: ['usuario'],
      order: { fecha: 'DESC' },
    });
  }

  async findByUsuario(userId: number) {
    return this.reseñaRepository.find({
      where: { usuario: { id: userId } },
      relations: ['restaurante'],
      order: { fecha: 'DESC' },
    });
  }

  async update(id: number, updateReseñaDto: UpdateReseñaDto) {
  const reseña = await this.reseñaRepository.findOne({
    where: { id },
    relations: ['usuario'],
  });

  if (!reseña) {
    throw new Error('Reseña no encontrada');
  }

  if (reseña.usuario.id !== updateReseñaDto.userId) {
    throw new Error('No tenés permiso para editar esta reseña');
  }

  reseña.puntuacion = updateReseñaDto.puntuacion ?? reseña.puntuacion;
  reseña.comentario = updateReseñaDto.comentario ?? reseña.comentario;

  return this.reseñaRepository.save(reseña);
}
async remove(id: number, userId: number) {
  const reseña = await this.reseñaRepository.findOne({
    where: { id },
    relations: ['usuario'],
  });

  if (!reseña) {
    throw new Error('Reseña no encontrada');
  }

  if (reseña.usuario.id !== userId) {
    throw new Error('No tenés permiso para eliminar esta reseña');
  }

  await this.reseñaRepository.remove(reseña);
  return { message: 'Reseña eliminada correctamente' };
}

}