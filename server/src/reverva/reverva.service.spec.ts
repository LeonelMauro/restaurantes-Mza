import { Test, TestingModule } from '@nestjs/testing';
import { RevervaService } from './reverva.service';

describe('RevervaService', () => {
  let service: RevervaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RevervaService],
    }).compile();

    service = module.get<RevervaService>(RevervaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
