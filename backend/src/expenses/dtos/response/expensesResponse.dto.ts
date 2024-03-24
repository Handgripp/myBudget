import { ApiProperty } from '@nestjs/swagger';
import { ExpensesData } from 'src/expenses/expenses.types';

export class ExpensesResponseDto {
  @ApiProperty({ example: 'a@a.com' })
  category: string;

  @ApiProperty({ example: 'kamil' })
  cost: string;

  @ApiProperty()
  user: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  id: string;

  constructor(data: ExpensesData) {
    this.id = data.id;
    this.category = data.category;
    this.cost = data.cost;
    this.user = data.user;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
