export type CreateBudgetsData = {
  name: string;
  user: string;
};

export type BudgetsData = {
  id: string;
  name: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
  expenses: string;
};

export type DeleteExpensesData = any;
