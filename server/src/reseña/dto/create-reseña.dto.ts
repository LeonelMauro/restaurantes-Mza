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

    @IsString()
    @IsNotEmpty()
    comentario: string;
}
 