import classes from './index.module.scss'
import { ReactNode } from 'react'
export function MediaColumn({ children }: { children: ReactNode }) {
  return <div className={classes.media}>{children}</div>
}
