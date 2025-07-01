import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDepartamentoDto {
    
    @IsString()
    @IsNotEmpty()
    nombre:string;

    @IsString()
    @IsNotEmpty()
    descripcion:string;

   @IsOptional()
    @IsString()
    imagenUrl?: string;

}
