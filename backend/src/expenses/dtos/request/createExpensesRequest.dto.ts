import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExpensesRequestDto {
  @ApiProperty({ example: 'food' })
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: '150' })
  @IsString()
  @IsNotEmpty()
  cost: string;

  @ApiProperty({ example: '2023-01-01' })
  @IsNotEmpty()
  date: Date;
}
