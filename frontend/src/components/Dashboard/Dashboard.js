import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.menu}>
        <Link to="/" className={styles.menuItem}>Dashboard</Link>
        <Link to="/transactions" className={styles.menuItem}>Transactions</Link>
        <Link to="/categories" className={styles.menuItem}>Category</Link>
        <Link to="/budgets" className={styles.menuItem}>Budgets</Link>
        <Link to="/reports" className={styles.menuItem}>Reports</Link>
        <Link to="/settings" className={styles.menuItem}>Settings</Link>
        <Link to="/contact" className={styles.menuItem}>Contact</Link>
        <Link to="/logout" className={styles.menuItem}>Log out</Link>
      </div>

      <div className={styles.content}>
      
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Cost</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
           
            <tr>
              <td>2024-03-25</td>
              <td>Sraka</td>
              <td>50.00 zł</td>
              <td>Stachu</td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
