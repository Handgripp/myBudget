import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
import { budgetsApi } from '../../api/budgets';
import styles from './SidebarMenu.module.css';

const SidebarMenu = () => {
  const [userBudgets, setUserBudgets] = useState([]);
  const authContext = useContext(AuthContext);

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

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h3>Your Budgets</h3>
      </div>
      <ul className={styles.sidebarMenu}>
        {userBudgets.map((budget) => (
          <li key={budget.id}>
            <Link to={`/budgets/${budget.id}`} className={styles.menuItem}>
              {budget.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMenu;
