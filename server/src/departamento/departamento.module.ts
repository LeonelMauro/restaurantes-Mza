import { Module } from '@nestjs/common';
import { DepartamentoService } from './departamento.service';
import { DepartamentoController } from './departamento.controller';
import { Departamento } from './entities/departamento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';

@Module({
   imports: [TypeOrmModule.forFeature([Departamento, Restaurante,])],
  controllers: [DepartamentoController],
  providers: [DepartamentoService],
})
export class DepartamentoModule {}
