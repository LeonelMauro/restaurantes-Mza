import { Module } from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { PerfilController } from './perfil.controller';
import { Perfil } from './entities/perfil.entity';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ User, Perfil])],
  controllers: [PerfilController],
  providers: [PerfilService],
})
export class PerfilModule {}
