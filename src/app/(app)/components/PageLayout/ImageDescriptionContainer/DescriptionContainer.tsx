import { ReactNode } from 'react'
import classes from './index.module.scss'
export function DescriptionContainer({ children }: { children: ReactNode }) {
  return <div className={classes.description}>{children}</div>
}
