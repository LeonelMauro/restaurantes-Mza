import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ){}

    async login(email:string , password:string){
        const user = await this.userService.findByEmail(email);

        if (!user){
            throw new HttpException('Usuario no encontrado', HttpStatus.UNAUTHORIZED)
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        )

        if(!isPasswordValid){
            throw new HttpException('Credenciales incorrectas',HttpStatus.UNAUTHORIZED)
        }
         //Datos que viajaran en el JWT
        const payload ={
          sub: user.id,
          email: user.email,
          tipo: user.tipo
         }

         try {
          //Generamos el token
          const accessToken = await this.jwtService.signAsync(
            payload,
            {
              secret: this.configService.getOrThrow<string>('JWT_SECRET'),
              expiresIn: this.configService.getOrThrow<string>('JWT_EXPIRATION')
            }
          );
          const refreshToken = await this.jwtService.signAsync(
            payload,
            {
              secret: this.configService.getOrThrow<string>('JWT_SECRET_REFRESH'),
              expiresIn: this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRATION')
            }
          ) 
          return{
            user,
            access_token: accessToken,
            refresh_token: refreshToken,
            message: 'Login correcto'
          }
         } 
         catch (error) {
          throw new HttpException('Error generando tokens', HttpStatus.INTERNAL_SERVER_ERROR)
         }

    }
}
