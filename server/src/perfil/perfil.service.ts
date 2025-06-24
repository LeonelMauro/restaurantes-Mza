import { Injectable } from '@nestjs/common';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Perfil } from './entities/perfil.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { privateDecrypt } from 'crypto';

@Injectable()
export class PerfilService {
  constructor(
    @InjectRepository(Perfil)
    private repositoryPerfil: Repository<Perfil>,

    @InjectRepository(User)
    private respositoryUser : Repository<User>
  ){}
  async create(createPerfilDto: CreatePerfilDto) {
    const user= await this.respositoryUser.findOne({
      where:{ id :createPerfilDto.userId}
    })
    

    return 'This action adds a new perfil';
  }

  findAll() {
    return `This action returns all perfil`;
  }

  findOne(id: number) {
    return `This action returns a #${id} perfil`;
  }

  update(id: number, updatePerfilDto: UpdatePerfilDto) {
    return `This action updates a #${id} perfil`;
  }

  remove(id: number) {
    return `This action removes a #${id} perfil`;
  }
}
