import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCategoryMenuDto {

    @IsString()
    @IsNotEmpty()
    nombre:string;

    @IsNumber()
    @IsNotEmpty()
    restauranteId: number; // <--- Agregar esto
}
