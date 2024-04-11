import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateExpensesRequestDto } from './dtos/request/createExpensesRequest.dto';
import { ExpensesResponseDto } from './dtos/response/expensesResponse.dto';
import { ExpensesService } from './expenses.service';
import { DeleteExpensesData } from './expenses.types';

@Controller('budgets')
@ApiTags('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post(':budgets/expenses')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async createExpenses(
    @Request() req: any,
    @Param('budgets', new ParseUUIDPipe()) budgets: string,
    @Body() body: CreateExpensesRequestDto,
  ): Promise<ExpensesResponseDto> {
    const user = req.user.sub;
    const expenses = await this.expensesService.addExpenses({
      ...body,
      user,
      budgets,
    });
    return new ExpensesResponseDto(expenses);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('expenses')
  async getAll(@Request() req: any): Promise<ExpensesResponseDto[]> {
    const userId = req.user.sub;
    const expenses = await this.expensesService.getAll(userId);
    return expenses.map((expenses) => new ExpensesResponseDto(expenses));
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':expensesId')
  async deleteExpenses(
    @Param('expensesId', new ParseUUIDPipe()) expensesId: string,
  ): Promise<DeleteExpensesData> {
    const expenses = await this.expensesService.delete(expensesId);
    return expenses;
  }
}
