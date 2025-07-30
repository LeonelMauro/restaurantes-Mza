import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEventoDto {
    @IsNotEmpty()
    @IsString()
    titulo: string;
    
    @IsString()
    @IsNotEmpty()
    descripcion: string;
    
    @IsDateString()
    fecha: Date;


    @IsOptional()
    @IsString()
    imagenUrl:string;

    

}
