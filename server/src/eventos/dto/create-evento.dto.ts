import { IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateEventoDto {
    @IsNotEmpty()
    @IsString()
    titulo: string;
    
    @IsString()
    @IsNotEmpty()
    descripcion: string;
    
    @IsDateString()
    fecha: Date;

    @IsNotEmpty()
    @IsString()
    hora: string;
}
