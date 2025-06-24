// src/reserva/dto/create-reserva.dto.ts

import { IsDateString, IsInt, Max, Min, } from 'class-validator';

export class CreateReservaDto {
  @IsDateString()
  fecha: Date;

  @IsInt()
  @Min(1)
  @Max(6)
  cantidadPersonas: number;
}
