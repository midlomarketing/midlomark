import { ReactNode } from 'react'
import classes from "./index.module.scss";

export function ButtonContainer({children, className, numberOfButtons,}: {
  children: ReactNode
  className?: string,
  numberOfButtons?: number
}) {
  return <div className={`${className} ${classes.cardButtonContainer}`}>{children}</div>
}
