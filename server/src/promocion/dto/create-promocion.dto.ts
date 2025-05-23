import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

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

  @IsNotEmpty()
  restauranteId: number;
}
