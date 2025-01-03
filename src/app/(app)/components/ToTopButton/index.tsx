"use client"

import React, {useEffect, useState} from "react";
import classes from './index.module.scss'

export function ToTopButton() {

  const [visible, setVisible] = useState(false)

  const handleVisibilityChange = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 200) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleVisibilityChange)
  }, [])

  const clickHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return <button className={`${classes.toTop} ${visible ? classes.visible : classes.hidden}`} onClick={clickHandler}>
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
      <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z"/>
    </svg>
  </button>
}
