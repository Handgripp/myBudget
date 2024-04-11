import { ApiProperty } from '@nestjs/swagger';
import { BudgetsData } from 'src/budgets/budgets.types';

export class BudgetsResponseDto {
  @ApiProperty({ example: 'food' })
  name: string;

  @ApiProperty()
  user: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  id: string;

  @ApiProperty()
  expenses: string;

  constructor(data: BudgetsData) {
    this.id = data.id;
    this.user = data.user;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.expenses = data.expenses;
    this.name = data.name;
  }
}
