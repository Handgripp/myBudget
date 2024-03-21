import axios from 'axios';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'; // Importuj Navigate
import { Button } from '../Button/Button';
import styles from './CreateUser.module.css';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3010/users', formData);
      console.log(response.data);
      setSuccess(true);
    } catch (error) {
      console.error('Error creating user:', error.response.data);
    }
  };

  if (success) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>Create User</div>
      <form onSubmit={handleSubmit} className={styles.inputContainer}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter username"
          className={styles.inputBox}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          className={styles.inputBox}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          className={styles.inputBox}
        />
        <Button type="submit" text="Create"/>
      </form>
    </div>
  );
};

export default CreateUser;
