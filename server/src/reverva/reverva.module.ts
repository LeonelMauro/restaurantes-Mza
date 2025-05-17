import { Module } from '@nestjs/common';
import { RevervaService } from './reverva.service';
import { RevervaController } from './reverva.controller';

@Module({
  controllers: [RevervaController],
  providers: [RevervaService],
})
export class RevervaModule {}
