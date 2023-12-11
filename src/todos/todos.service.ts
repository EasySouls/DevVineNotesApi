import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TodosService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createTodoDto: Prisma.TodoCreateInput) {
    return this.databaseService.todo.create({
      data: createTodoDto,
    });
  }

  async findAll(completed?: string) {
    if (completed != undefined) {
      return this.databaseService.todo.findMany({
        where: { isCompleted: completed === 'true' ? true : false },
      });
    } else {
      return this.databaseService.todo.findMany();
    }
  }

  async findOne(id: number) {
    return this.databaseService.todo.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateTodoDto: Prisma.TodoUpdateInput) {
    return this.databaseService.todo.update({
      where: { id: id },
      data: updateTodoDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.todo.delete({
      where: {
        id,
      },
    });
  }
}
