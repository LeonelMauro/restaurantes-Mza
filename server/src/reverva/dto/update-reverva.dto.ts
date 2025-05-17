import { PartialType } from '@nestjs/mapped-types';
import { CreateRevervaDto } from './create-reverva.dto';

export class UpdateRevervaDto extends PartialType(CreateRevervaDto) {}
