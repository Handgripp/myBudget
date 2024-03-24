import authenticatedAxios from './authenticatedAxios';

export const expensesApi = {
  expensesGetAll(data) {
    return authenticatedAxios.get('http://localhost:3010/expenses', data);
  },
  createExpenses(data) {
    return authenticatedAxios.post('http://localhost:3010/expenses', data);
  }
}