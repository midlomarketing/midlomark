import classes from './index.module.scss'
import React from 'react'

export function ConnectButton({ className }: { className?: string }) {
  return (
    <div className={`${classes.btnContainer} ${className}`}>
      <a
        rel={`noreferrer noopener`}
          data-open-in-church-center-modal={'true'}
        href={`https://local.churchcenter.com/people/forms/115766`}
        target={'_blank'}
        className={`${classes.btn} ${classes.btnPrimary}`}
      >
        Made a decision to follow Jesus?
      </a>
      <a
          rel={`noreferrer noopener`}
        data-open-in-church-center-modal={'true'}
        href={`https://local.churchcenter.com/giving`}
        target={`_blank`}
        className={`${classes.btn} ${classes.btnSecondary}`}
      >
        Partner with us financially
      </a>
    </div>
  )
}
