// src/reserva/dto/create-reserva.dto.ts

import { IsDateString, IsInt, Min } from 'class-validator';

export class CreateReservaDto {
  @IsDateString()
  fecha: Date;

  @IsInt()
  @Min(1)
  cantidadPersonas: number;
}
