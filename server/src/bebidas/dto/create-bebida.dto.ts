import {  IsNotEmpty, IsNumber, IsString,  } from "class-validator";

export class CreateBebidaDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;
    
    @IsString()
    @IsNotEmpty()
    descripcion: string;
    
    @IsNumber()
    @IsNotEmpty()
    precio: number;

    @IsNumber()
    @IsNotEmpty()
    restauranteId:number;
}
