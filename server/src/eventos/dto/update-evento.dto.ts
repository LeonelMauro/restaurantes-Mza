import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateEventoDto  {
    @IsOptional()
    @IsString()
    titulo?: string;


    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsDateString()
    fecha: Date;
   
    
    @IsOptional()
    @IsString()
    imagenUrl?: string;

    @IsOptional()
    @IsNumber()
    restauranteId?: number; // ✅ Agregalo así
        
}
