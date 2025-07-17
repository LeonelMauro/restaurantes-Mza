import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRestauranteDto {
  @Transform(({ value }) => 
    value.trim().charAt(0).toUpperCase() + value.trim().slice(1).toLowerCase()
  )
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
  contacto: string; 

  @IsString()
  @IsNotEmpty()
  horario: string;
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsNotEmpty()
  departamentoId: number;
}
