import { Injectable, UseGuards } from '@nestjs/common';
import { CreateReseñaDto } from './dto/create-reseña.dto';
import { UpdateReseñaDto } from './dto/update-reseña.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';
import { User } from 'src/user/entities/user.entity';
import { Reseña } from './entities/reseña.entity';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';

@Injectable()
export class ReseñaService {
  constructor(
    @InjectRepository(Restaurante)
    private restauranteRepository: Repository<Restaurante>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Reseña)
    private reseñaRepository: Repository<Reseña>,
  ){}

  @UseGuards(JwtAuthGuard)
  async create(CreateReseñaDto: CreateReseñaDto) {
    const restaurante= await this.restauranteRepository.findOne({
      where: {id: CreateReseñaDto.restauranteId,},
    });

    if(!restaurante) {
      throw new Error('Restaurante no encontrado')
    };

    const usuario= await this.userRepository.findOne({
      where: {id: CreateReseñaDto.userId}
    });

    if(!usuario) {
      throw new Error('Usuario no encontrado')
    }

    const resena= this.reseñaRepository.create({
      puntuacion:CreateReseñaDto.puntuacion,
      comentario:CreateReseñaDto.comentario,
      restaurante: restaurante,
      usuario:usuario,
    })
    return this,this.reseñaRepository.save(resena);
  };

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