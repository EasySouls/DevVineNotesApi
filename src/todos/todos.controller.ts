import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Ip,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { LoggerService } from '../logger/logger.service';

@SkipThrottle()
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}
  private readonly logger = new LoggerService(TodosController.name);

  @Post()
  create(@Body() createTodoDto: Prisma.TodoCreateInput) {
    return this.todosService.create(createTodoDto);
  }

  @SkipThrottle({ default: false })
  @Get()
  findAll(@Ip() ip: string, @Query('completed') completed?: string) {
    this.logger.log(`Request for all todos\t${ip}`);
    return this.todosService.findAll(completed);
  }

  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: Prisma.TodoUpdateInput,
  ) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
