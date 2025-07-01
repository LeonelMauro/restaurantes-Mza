import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRestauranteDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  horario: string;

  @IsOptional()
  @IsNumber()
  departamento?: number; // 👈 ESTO
}

