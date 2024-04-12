import authenticatedAxios from './authenticatedAxios';

export const expensesApi = {
  expensesGetAll(data) {
    return authenticatedAxios.get('http://localhost:3010/budgets/expenses', data);
  },
  expensesGetAllByBudgetId(budgetId, data) {
    return authenticatedAxios.get(`http://localhost:3010/budgets/${budgetId}/expenses`, data);
  },
  createExpenses(budgetId, data) {
    return authenticatedAxios.post(`http://localhost:3010/budgets/${budgetId}/expenses`, data);
  },
  deleteExpenses(expensesId) {
  return authenticatedAxios.delete(`http://localhost:3010/budgets/${expensesId}`);
}
}