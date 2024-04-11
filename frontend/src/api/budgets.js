import authenticatedAxios from './authenticatedAxios';

export const budgetsApi = {
  getAll(data) {
    return authenticatedAxios.get('http://localhost:3010/budgets', data);
  }
}