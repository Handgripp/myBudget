import { Injectable } from '@nestjs/common';
import { ExpensesRepository } from 'src/shared/repositories/expenses.repository';
import { CreateExpensesData } from './expenses.types';

@Injectable()
export class ExpensesService {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  async addExpenses({ category, cost, user }: CreateExpensesData) {
    const expenses = await this.expensesRepository.create({
      category,
      cost,
      user,
    });
    return await this.expensesRepository.findOneById(user, expenses.id);
  }

  async getAll(userId: string) {
    return this.expensesRepository.findManyByUserId(userId);
  }
}
