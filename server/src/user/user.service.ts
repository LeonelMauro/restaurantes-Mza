import {  Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto.nombre); // ¿Está capitalizado?
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<User |null> {
    return this.userRepository.findOne({
      where:{email},
      relations:['role']
    })
    ;
  };

  
  findAll() {
    return `This action returns all users`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
