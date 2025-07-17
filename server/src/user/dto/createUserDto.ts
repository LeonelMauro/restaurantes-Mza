import { IsEmail, IsIn, IsNotEmpty, IsString, MinLength,  } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  //Por si el valor ingresado contiene espacios al principio o al final
  @Transform(({ value }) => 
  value.trim().charAt(0).toUpperCase() + value.trim().slice(1).toLowerCase()
)
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @Transform(({ value }) => value.trim())
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  provincia: string

  @IsNotEmpty()
  @IsString()
  nacionalidad: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  
  @IsString()
  @IsIn(['turista', 'restaurante'])
  tipo: 'turista' | 'restaurante'; 

}