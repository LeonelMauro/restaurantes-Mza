import { PartialType } from '@nestjs/mapped-types';
import { CreateReservaDto } from './create-reserva.dto';

export class UpdateRevervaDto extends PartialType(CreateReservaDto) {}
