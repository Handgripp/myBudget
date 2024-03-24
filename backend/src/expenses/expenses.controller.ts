import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateExpensesRequestDto } from './dtos/request/createExpensesRequest.dto';
import { ExpensesResponseDto } from './dtos/response/expensesResponse.dto';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
@ApiTags('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post('')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async createExpenses(
    @Request() req: any,
    @Body() body: CreateExpensesRequestDto,
  ): Promise<ExpensesResponseDto> {
    const user = req.user.sub;
    const expenses = await this.expensesService.addExpenses({
      ...body,
      user,
    });
    return new ExpensesResponseDto(expenses);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('')
  async getAll(@Request() req: any): Promise<ExpensesResponseDto[]> {
    const userId = req.user.sub;
    const expenses = await this.expensesService.getAll(userId);
    console.log(expenses);
    return expenses.map((expenses) => new ExpensesResponseDto(expenses));
  }
}
