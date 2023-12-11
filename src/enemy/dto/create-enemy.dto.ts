import { IsEnum, IsString } from 'class-validator';

export class CreateEnemyDto {
  @IsString()
  name: string;

  @IsString()
  powerGrade: string;

  @IsEnum(['Common', 'Boss'], {
    message: 'Valid type required',
  })
  type: 'Common' | 'Boss';
}
