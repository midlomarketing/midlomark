import classes from './index.module.scss'
import { ReactNode } from 'react'

export function BreadCrumbsContainer({ children }: { children: ReactNode }) {

  return <div className={classes.breadcrumbContainer}>{children}</div>
}
