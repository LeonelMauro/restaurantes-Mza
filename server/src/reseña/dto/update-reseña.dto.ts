// update-reseña.dto.ts
import { IsOptional, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateReseñaDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number; // usuario que intenta editar

  @IsOptional()
  @IsNumber()
  puntuacion?: number;

  @IsOptional()
  @IsString()
  comentario?: string;
}
