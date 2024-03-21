import React from 'react';
import { Button } from '../Button/Button';
import styles from "./Home.module.css";

export const Home = (props) => {
  const { loggedIn, email } = props

  const onButtonClick = () => {
    // You'll update this function later
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={styles.titleContainer}>
        <Button onClick={onButtonClick} text={loggedIn ? 'Log out' : 'Log in'} />
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
      </div>
      <div>
          Don't have an account?{' '}
          <Button to="/create-user" text="Create here" />
      </div>
    </div>
  )
}

