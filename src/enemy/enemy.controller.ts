import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { EnemyService } from './enemy.service';
import { CreateEnemyDto } from './dto/create-enemy.dto';
import { UpdateEnemyDto } from './dto/update-enemy.dto';

@Controller('enemies')
export class EnemyController {
  constructor(private readonly enemyService: EnemyService) {}

  @Get() // GET /enemies or /enemies?type=value
  findAll(@Query('type') type: 'Common' | 'Boss') {
    return this.enemyService.findAll(type);
  }

  @Get(':id') // GET /enemies/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.enemyService.findOne(id);
  }

  @Post() // POST /enemies
  create(
    @Body(ValidationPipe)
    createEnemyDto: CreateEnemyDto,
  ) {
    return this.enemyService.create(createEnemyDto);
  }

  @Patch('id') // PATCH /enemies/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateEnemyDto: UpdateEnemyDto,
  ) {
    return this.enemyService.update(id, updateEnemyDto);
  }

  @Delete('id') // DELETE /enemies/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.enemyService.delete(id);
  }
}
