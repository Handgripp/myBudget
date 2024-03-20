import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../Button/Button'
import styles from "./Home.module.css"

export const Home = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()

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
    </div>
  )
}

