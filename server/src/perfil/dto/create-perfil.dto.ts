import { IsNotEmpty,  IsNumber, IsString } from "class-validator";

export class CreatePerfilDto {
    
    @IsString()
    @IsNotEmpty()
    foto:string


    @IsString()
    @IsNotEmpty()
    telefono: string;
    
    @IsString()
    @IsNotEmpty()
    nacionalidad: string;
    
    @IsString()
    @IsNotEmpty()
    provincia: string;
    
    @IsString()
    @IsNotEmpty()
    fechaNacimiento: Date;

    @IsNumber()
    @IsNotEmpty()
    userId: number; // <--- Agregar esto
    
    
    
}
