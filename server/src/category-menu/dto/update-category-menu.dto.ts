import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryMenuDto } from './create-category-menu.dto';

export class UpdateCategoryMenuDto extends PartialType(CreateCategoryMenuDto) {}
