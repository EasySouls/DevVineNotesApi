import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateEnemyDto } from './dto/update-enemy.dto';
import { CreateEnemyDto } from './dto/create-enemy.dto';

@Injectable()
export class EnemyService {
  private enemies = [
    {
      id: 1,
      name: 'Sukuna',
      powerGrade: 'Special',
      type: 'Boss',
    },
    {
      id: 2,
      name: 'Geto',
      powerGrade: 'Special',
      type: 'Boss',
    },
    {
      id: 3,
      name: 'Mahito',
      powerGrade: 'Special',
      type: 'Common',
    },
  ];

  findAll(type?: 'Common' | 'Boss') {
    if (type) {
      const typesArray = this.enemies.filter((enemy) => enemy.type === type);
      if (typesArray.length === 0) {
        throw new NotFoundException('Enemy Type Not Found');
      }
      return typesArray;
    }
    return this.enemies;
  }

  findOne(id: number) {
    const enemy = this.enemies.find((enemy) => enemy.id === id);

    if (!enemy) {
      throw new NotFoundException('Enemy Not Found');
    }

    return enemy;
  }

  create(createEnemyDto: CreateEnemyDto) {
    const enemiesByHighestId = [...this.enemies].sort((a, b) => b.id - a.id);
    const newEnemy = {
      id: enemiesByHighestId[0].id + 1,
      ...createEnemyDto,
    };
    this.enemies.push(newEnemy);
    return newEnemy;
  }

  update(id: number, updateEnemyDto: UpdateEnemyDto) {
    this.enemies = this.enemies.map((enemy) => {
      if (enemy.id === id) {
        return { ...enemy, ...updateEnemyDto };
      }
      return enemy;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedEnemy = this.findOne(id);

    this.enemies = this.enemies.filter((enemy) => enemy.id !== id);

    return removedEnemy;
  }
}
