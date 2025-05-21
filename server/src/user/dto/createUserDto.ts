import { IsEmail, IsIn, IsNotEmpty, IsString, MinLength,  } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
  
  @IsString()
  @IsIn(['turista', 'restaurante'])
  tipo: 'turista' | 'restaurante'; 

}