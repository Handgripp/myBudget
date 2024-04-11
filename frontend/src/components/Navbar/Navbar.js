import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
import styles from './Navbar.module.css';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    authContext.logout();
    navigate('/');
  };

  return (
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
  );
};

export default Navbar;
