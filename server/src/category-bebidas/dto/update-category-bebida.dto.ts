import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryBebidaDto } from './create-category-bebida.dto';

export class UpdateCategoryBebidaDto extends PartialType(CreateCategoryBebidaDto) {}
