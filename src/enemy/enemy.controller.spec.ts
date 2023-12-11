import { Test, TestingModule } from '@nestjs/testing';
import { EnemyController } from './enemy.controller';
import { EnemyService } from './enemy.service';

describe('EnemyController', () => {
  let controller: EnemyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnemyController],
      providers: [EnemyService],
    }).compile();

    controller = module.get<EnemyController>(EnemyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
