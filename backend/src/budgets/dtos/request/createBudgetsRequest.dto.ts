import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBudgetsRequestDto {
  @ApiProperty({ example: 'food' })
  @IsNotEmpty()
  name: string;
}
