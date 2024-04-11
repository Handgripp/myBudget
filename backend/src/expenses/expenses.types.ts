export type CreateExpensesData = {
  category: string;
  cost: string;
  user: string;
  date: Date;
  budgets: string;
};

export type ExpensesData = {
  id: string;
  category: string;
  cost: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
  date: Date;
};

export type DeleteExpensesData = any;
