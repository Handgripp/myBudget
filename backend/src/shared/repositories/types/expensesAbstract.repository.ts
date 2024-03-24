import { CreateExpensesData, ExpensesData } from 'src/expenses/expenses.types';

export abstract class AbstractExpensesRepository {
  abstract create(data: CreateExpensesData): Promise<ExpensesData>;
  abstract findManyByUserId(userId: string): Promise<ExpensesData[]>;
  abstract findOneById(
    userId: string,
    expenseId: string,
  ): Promise<ExpensesData>;
}
