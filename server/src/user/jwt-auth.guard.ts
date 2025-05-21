// jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Token no encontrado');
    }

    const token = authHeader.split(' ')[1]; // Suponiendo que el token está en el formato "Bearer <token>"

    try {
      const decoded = jwt.verify(token, 'jwt_secret'); // Asegúrate de que 'jwt_secret' sea el mismo que usas para firmar los tokens
      request.user = decoded; // Adjunta el usuario decodificado a la solicitud
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}