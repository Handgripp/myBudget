import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../Button/Button'
import styles from './LoginForm.module.css'

export const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = async () => {
  console.log('gowno');
  try {
    const response = await axios.post('http://localhost:3010/auth/login', { email, password });
    console.log(response?.data);
    navigate('/');
  } catch (error) {
    console.error('Error logging in:', error.response.data);
  }
};

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div>Login</div>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <input
          value={email}
          placeholder="Enter your email here" 
          onChange={(ev) => setEmail(ev.target.value)}
          className={styles.inputBox}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={styles.inputBox}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <Button onClick={onButtonClick} text="Log in" />
      </div>
    </div>
  )
}