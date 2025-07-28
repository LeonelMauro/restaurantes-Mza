import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Evento } from './entities/evento.entity';
import { Repository } from 'typeorm';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class EventosService {
  constructor(
    
    @InjectRepository(Evento)
    private eventoRepository: Repository<Evento>,

    @InjectRepository(Restaurante)
    private restauranteRepository : Repository<Restaurante>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
   
  ){}
  async create(dto: CreateEventoDto, userId: number, file?: Express.Multer.File) {
  const user = await this.userRepository.findOne({
    where: { id: userId },
    relations: ['restaurante'],
  });

  if (!user || !user.restaurante) throw new UnauthorizedException();

  const evento = this.eventoRepository.create({
    titulo: dto.titulo,
    descripcion: dto.descripcion,
    fecha: dto.fecha,
    hora: dto.hora,
    imagenUrl: file?.filename || '', // o `file.path` o una URL si usás S3
    restaurante: user.restaurante,
  });

  return this.eventoRepository.save(evento);
}

  findAll() {
  return this.eventoRepository.find({
    relations: ['restaurante', 'reservas'],
  });
}
  async findByRestaurante(restauranteId: number) {
  const restaurante = await this.restauranteRepository.findOne({
    where: { id: restauranteId },
  });

  if (!restaurante) {
    throw new NotFoundException(`Restaurante con ID ${restauranteId} no encontrado`);
  }

  return this.eventoRepository.find({
    where: { restaurante: { id: restauranteId } },
    relations: ['restaurante', 'reservas'],
  });
}


  async findOne(id: number) {
  const evento = await this.eventoRepository.findOne({
    where: { id },
    relations: ['restaurante', 'reservas'],
  });

  if (!evento) {
    throw new NotFoundException(`Evento con ID ${id} no encontrado`);
  }

  return evento;
}


 async update(id: number, dto: UpdateEventoDto) {
     const evento = await this.eventoRepository.findOneBy({ id });
     if (!evento) {
       throw new NotFoundException(`Evento con ID ${id} no encontrado`);
     }
 
     Object.assign(evento, dto);
     return this.eventoRepository.save(evento);
   }


  async remove(id: number) {
  const evento = await this.eventoRepository.findOne({ where: { id } });

  if (!evento) {
    throw new NotFoundException(`Evento con ID ${id} no encontrado`);
  }

  return this.eventoRepository.remove(evento);
}
}
