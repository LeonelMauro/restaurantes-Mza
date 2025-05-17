import { Test, TestingModule } from '@nestjs/testing';
import { RevervaController } from './reverva.controller';
import { RevervaService } from './reverva.service';

describe('RevervaController', () => {
  let controller: RevervaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RevervaController],
      providers: [RevervaService],
    }).compile();

    controller = module.get<RevervaController>(RevervaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
