import { IsOptional, IsString } from 'class-validator';

export class UpdateDepartamentoDto {
  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  imagenUrl?: string;
}
