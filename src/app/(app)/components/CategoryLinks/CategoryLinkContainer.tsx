import classes from './index.module.scss'
import { ReactNode } from 'react'

export function CategoryLinkContainer({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`${classes.container} ${className}`}>{children}</div>
}
