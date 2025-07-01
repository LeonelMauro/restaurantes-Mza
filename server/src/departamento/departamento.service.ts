import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departamento } from './entities/departamento.entity';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
  ) {}

  async create(createDepartamentoDto: CreateDepartamentoDto, imagePath?: string) {
    const departamento = this.departamentoRepository.create({
      nombre: createDepartamentoDto.nombre,
      descripcion: createDepartamentoDto.descripcion,
      imagenUrl: createDepartamentoDto.imagenUrl,

    });

    return await this.departamentoRepository.save(departamento);
  }

  async findAll() {
    return this.departamentoRepository.find();
  }

  async findOne(id: number) {
    const departamento = await this.departamentoRepository.findOneBy({ id });
    if (!departamento) {
      throw new NotFoundException(`Departamento con ID ${id} no encontrado`);
    }
    return departamento;
  }

  async update(id: number, dto: UpdateDepartamentoDto) {
    const departamento = await this.departamentoRepository.findOneBy({ id });
    if (!departamento) {
      throw new NotFoundException(`Departamento con ID ${id} no encontrado`);
    }

    Object.assign(departamento, dto);
    return this.departamentoRepository.save(departamento);
  }

  async remove(id: number) {
    const departamento = await this.departamentoRepository.findOneBy({ id });
    if (!departamento) {
      throw new NotFoundException(`Departamento con ID ${id} no encontrado`);
    }
    await this.departamentoRepository.remove(departamento);
    return { message: `Departamento con ID ${id} eliminado correctamente` };
  }
}
