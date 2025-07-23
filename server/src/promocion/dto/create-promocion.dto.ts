import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePromocionDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsDateString()
  fechaInicio: Date;

  @IsDateString()
  fechaFin: Date;
  
  @IsNumber()
  precio: number;

  @IsNotEmpty()
  restauranteId: number;
}
