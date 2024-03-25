import React, { useContext, useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../AuthProvider';
import { expensesApi } from '../../api/expenses';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    date: '',
    category: '',
    cost: 0,
  });
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    try {
      const response = await expensesApi.expensesGetAll();
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
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
      await expensesApi.createExpenses(newExpense);
      fetchExpenses();
      setNewExpense({
        date: '',
        category: '',
        cost: 0,
      });
    } catch (error) {
      console.error('Error creating expense:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()}`;
  };

  const logout = () => {
    authContext.logout();
    navigate('/');
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await expensesApi.deleteExpenses(expenseId);
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== expenseId));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleEditExpense = async (expenseId) => {
    return expenseId;
  };

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
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Cost</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input 
                  type="date" 
                  name="date" 
                  value={newExpense.date} 
                  onChange={handleInputChange} 
                  placeholder="Date" 
                  className={styles.inputFieldDate} 
                />
              </td>
              <td>
                <input 
                  type="text" 
                  name="category" 
                  value={newExpense.category} 
                  onChange={handleInputChange} 
                  placeholder="Category" 
                  className={styles.inputFieldCategory} 
                />
              </td>
              <td>
                <input 
                  type="number" 
                  name="cost" 
                  value={newExpense.cost} 
                  onChange={handleInputChange} 
                  placeholder="Cost" 
                  className={styles.inputFieldCost} 
                />
              </td>
              <td>
                <button className={`${styles.addButton} ${styles.plusIcon}`} onClick={handleSubmit}>
                  <FaPlus />
                </button>
              </td>
            </tr>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{formatDate(expense.date)}</td>
                <td>{expense.category}</td>
                <td>{expense.cost}</td>
                <td>
                  <button className={styles.editButton} onClick={() => handleEditExpense(expense.id)}><FaEdit /></button>
                  <button className={styles.deleteButton} onClick={() => handleDeleteExpense(expense.id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
