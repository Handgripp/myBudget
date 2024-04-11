import { Injectable } from '@nestjs/common';
import { BudgetsRepository } from 'src/shared/repositories/budgets.repository';
import { CreateBudgetsData } from './budgets.types';

@Injectable()
export class BudgetsService {
  constructor(private readonly budgetsRepository: BudgetsRepository) {}

  async addBudgets({ name, user }: CreateBudgetsData) {
    const budgets = await this.budgetsRepository.create({
      name,
      user,
    });
    return budgets;
  }

  async getAll(userId: string) {
    return this.budgetsRepository.findManyByUserId(userId);
  }
}
