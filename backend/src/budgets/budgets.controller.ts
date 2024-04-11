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
import { BudgetsService } from './budgets.service';
import { CreateBudgetsRequestDto } from './dtos/request/createBudgetsRequest.dto';
import { BudgetsResponseDto } from './dtos/response/budgetsResponse.dto';

@Controller('budgets')
@ApiTags('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post('')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async createBudgets(
    @Request() req: any,
    @Body() body: CreateBudgetsRequestDto,
  ): Promise<BudgetsResponseDto> {
    const user = req.user.sub;
    const expenses = await this.budgetsService.addBudgets({
      ...body,
      user,
    });
    return new BudgetsResponseDto(expenses);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('')
  async getAll(@Request() req: any): Promise<BudgetsResponseDto[]> {
    const userId = req.user.sub;
    const budgets = await this.budgetsService.getAll(userId);
    return budgets.map((budgets) => new BudgetsResponseDto(budgets));
  }
}
