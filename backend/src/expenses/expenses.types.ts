export type CreateExpensesData = {
  category: string;
  cost: string;
  user: string;
};

export type ExpensesData = {
  id: string;
  category: string;
  cost: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
};
