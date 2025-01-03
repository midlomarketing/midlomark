import classes from './index.module.scss'
import React from 'react'

export function TitleContainer({ children }: { children: React.ReactNode }) {
  return <section className={classes.titleContainer}>{children}</section>
}
