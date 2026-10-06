import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { AuthUser } from "../interfaces/auth-user.interface";

@Injectable()
export class RolesGuard implements CanActivate{
  constructor(
    private readonly reflector :Reflector
  ){}

  canActivate(context: ExecutionContext): boolean {
    
    //Obtenemos los roles requeridos por el endpoint
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
       ROLES_KEY,
    [
      context.getHandler(),
      context.getClass()
    ]
    );
    // Si el endpoind no tiene @Roles(),no regristramos por rol
    if(!requiredRoles){
      return true;
    }
    
    // Obtenemos el usuario autenticado por JwtAuthGuard
    const request = context.switchToHttp().getRequest<{
      user:AuthUser;
    }>();

    const user = request.user;

    if(!user){
      throw new ForbiddenException(
        'Usuario no autenticado')
    };

    //Comprobamos si el rol del usuario esta permitido
    const hasRole = requiredRoles.includes(user.role);
    
    if(!hasRole){
      throw new ForbiddenException(
        'No tienes permiso para acceder a este recurso'
      )
    }
    
    return true;
  }
}