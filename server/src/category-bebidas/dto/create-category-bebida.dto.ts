import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCategoryBebidaDto {
    @IsString()
    @IsNotEmpty()
    nombre:string;

    @IsNumber()
    @IsNotEmpty()
    restauranteId: number; // <--- Agregar esto

    
}
