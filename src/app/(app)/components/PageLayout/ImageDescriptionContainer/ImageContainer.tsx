import { ReactNode } from 'react'
import classes from './index.module.scss'

export function ImageContainer({ children }: { children: ReactNode }) {
  return <div className={classes.left}>{children}</div>
}
