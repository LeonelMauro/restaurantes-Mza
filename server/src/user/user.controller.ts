
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/LoginUserDto';
import {JwtAuthGuard} from './jwt-auth.guard'

@Controller('user')
export default class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    return this.userService.loginUser(email, password);
  }

  
  @Get()
  findAll() {
    return this.userService.findAll();
  }

 

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @UseGuards(JwtAuthGuard) 
  @Get('profile')
  getProfile() {
    return 'Acceso permitido. Esta es la información del perfil.';
  }
}
