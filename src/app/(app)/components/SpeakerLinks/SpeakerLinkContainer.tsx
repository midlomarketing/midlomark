import classes from './index.module.scss'
import { ReactNode } from 'react'

export function SpeakerLinkContainer({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`${classes.container} ${className}`}>
      <div>{children}</div>
    </div>
  )
}
