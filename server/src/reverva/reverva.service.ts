import { Injectable } from '@nestjs/common';
import { CreateRevervaDto } from './dto/create-reverva.dto';
import { UpdateRevervaDto } from './dto/update-reverva.dto';

@Injectable()
export class RevervaService {
  create(createRevervaDto: CreateRevervaDto) {
    return 'This action adds a new reverva';
  }

  findAll() {
    return `This action returns all reverva`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reverva`;
  }

  update(id: number, updateRevervaDto: UpdateRevervaDto) {
    return `This action updates a #${id} reverva`;
  }

  remove(id: number) {
    return `This action removes a #${id} reverva`;
  }
}
