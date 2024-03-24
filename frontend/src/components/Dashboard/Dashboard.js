import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../AuthProvider';
import { expensesApi } from '../../api/expenses';
import { Button } from '../Button/Button';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    category: '',
    cost: 0,
  });
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await expensesApi.expensesGetAll();
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({
      ...newExpense,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await expensesApi.createExpenses(newExpense);
      setExpenses([...expenses, response.data]);
      setNewExpense({
        category: '',
        cost: 0,
      });
    } catch (error) {
      console.error('Error creating expense:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const logout = () => {
    authContext.logout()
    navigate('/')
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.menu}>
        <span className={styles.logo}>myBudget</span>
        <Link to="/" className={styles.menuItem}>Dashboard</Link>
        <Link to="/budgets" className={styles.menuItem}>Budgets</Link>
        <Link to="/reports" className={styles.menuItem}>Reports</Link>
        <Link to="/settings" className={styles.menuItem}>Settings</Link>
        <Link to="/contact" className={styles.menuItem}>Contact</Link>
        <div className={styles.logoutButtonContainer}>
          <button className={`${styles.menuItem} ${styles.logoutButton}`} onClick={logout}>Log out</button>
        </div>
    </div>

      <div className={styles.content}>
        <form className={styles.expenseForm} onSubmit={handleSubmit}>
          <input
            type="text"
            name="date"
            value={newExpense.category}
            onChange={handleInputChange}
            placeholder="Date"
            className={styles.inputField}
          />
          <input
            type="text"
            name="category"
            value={newExpense.category}
            onChange={handleInputChange}
            placeholder="Category"
            className={styles.inputField}
          />
          <input
            type="number"
            name="cost"
            value={newExpense.cost}
            onChange={handleInputChange}
            placeholder="Cost"
            className={styles.inputField}
          />
          <Button text='Add' />
        </form>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Added at</th>
              <th>Category</th>
              <th>Cost</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{formatDate(expense.createdAt)}</td>
                <td>{formatDate(expense.createdAt)}</td>
                <td>{expense.category}</td>
                <td>{expense.cost}</td>
                <td>{expense.user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
