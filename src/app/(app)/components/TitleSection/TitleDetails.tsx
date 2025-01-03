import classes from './index.module.scss'
import { ReactNode } from 'react'

export function TitleDetails({ children }: { children: ReactNode }) {
  return <div className={classes.details}>{children}</div>
}
