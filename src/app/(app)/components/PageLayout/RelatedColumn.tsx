import classes from './index.module.scss'
import { ReactNode } from 'react'

export function RelatedColumn({ children }: { children: ReactNode }) {
  return <aside className={classes.related}>{children}</aside>
}
