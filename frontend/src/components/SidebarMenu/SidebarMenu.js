import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
import { budgetsApi } from '../../api/budgets';
import styles from './SidebarMenu.module.css';

const SidebarMenu = () => {
  const [userBudgets, setUserBudgets] = useState([]);
  const authContext = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const fetchUserBudgets = async () => {
      try {
        const response = await budgetsApi.getAll();
        setUserBudgets(response.data);
      } catch (error) {
        console.error('Error fetching user budgets:', error);
      }
    };

    fetchUserBudgets();
  }, []);

  const isActiveBudget = (budgetId) => {
    return location.pathname.includes(`/dashboard/${budgetId}`);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h3>Your Budgets</h3>
      </div>
      <ul className={styles.sidebarMenu}>
        {userBudgets.map((budget) => (
          <li key={budget.id}>
            <Link
              to={`/dashboard/${budget.id}`}
              className={`${styles.menuItem} ${isActiveBudget(budget.id) && styles.activeMenuItem}`}
            >
              {budget.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMenu;
