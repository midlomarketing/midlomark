'use client'

import classes from './index.module.scss'
import { ReactNode, useState } from 'react'

const StickyBanner = ({ children }: { children: ReactNode }) => {
  const [clicked, setClicked] = useState(false)

  return (
    <div className={clicked ? classes.hide : classes.container}>
      <div className={classes.text}>{children}</div>
      <div
        className={classes.exit}
        onClick={() => {
          setClicked(true)
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
  )
}

export default StickyBanner
