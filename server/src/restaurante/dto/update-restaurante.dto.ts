import {  IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRestauranteDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  horario?: string;

  @IsOptional()
  @IsNumber()
  departamento?: number;
  
  @IsOptional()
  @IsString()
  contacto?: string
}
