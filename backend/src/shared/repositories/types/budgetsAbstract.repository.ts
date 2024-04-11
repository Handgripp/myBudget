import { BudgetsData, CreateBudgetsData } from 'src/budgets/budgets.types';

export abstract class AbstractBudgetsRepository {
  abstract create(data: CreateBudgetsData): Promise<BudgetsData>;
}
