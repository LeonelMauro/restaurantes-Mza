import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/user/dto/LoginUserDto';

@Controller('auth')
export class AuthController {
  constructor(
      private readonly authService: AuthService
  ){}

  @Post('login')
  login(@Body() loginUserDto:LoginUserDto){
    const {email,password}= loginUserDto;
    return this.authService.login(email,password);
  }

}
