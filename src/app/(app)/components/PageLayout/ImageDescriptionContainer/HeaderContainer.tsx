import { ReactNode } from 'react'
import classes from './index.module.scss'

export function HeaderContainer({ children }: { children: ReactNode }) {
  return <div className={`${classes.header}`}>{children}</div>
}
