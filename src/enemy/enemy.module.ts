import { Module } from '@nestjs/common';
import { EnemyService } from './enemy.service';
import { EnemyController } from './enemy.controller';

@Module({
  providers: [EnemyService],
  controllers: [EnemyController]
})
export class EnemyModule {}
