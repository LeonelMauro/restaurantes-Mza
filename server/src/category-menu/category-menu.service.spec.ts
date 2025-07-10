import { Test, TestingModule } from '@nestjs/testing';
import { CategoryMenuService } from './category-menu.service';

describe('CategoryMenuService', () => {
  let service: CategoryMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryMenuService],
    }).compile();

    service = module.get<CategoryMenuService>(CategoryMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
