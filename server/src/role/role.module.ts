import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forFeature([Role,]), // Repositorios de las entidades    
    ],
  providers: [RoleService]
})
export class RoleModule {}
