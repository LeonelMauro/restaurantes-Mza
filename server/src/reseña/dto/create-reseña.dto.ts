import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReseñaDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  restauranteId: number;
  
  @IsNumber()
  @IsNotEmpty()
  puntuacion: number;

  @Transform(({ value }) => 
    value.trim().charAt(0).toUpperCase() + value.trim().slice(1)
  )
  @IsString()
  @IsNotEmpty()
  comentario: string;
}
