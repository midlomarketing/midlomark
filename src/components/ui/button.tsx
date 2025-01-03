import * as React from 'react'
import classes from './index.module.scss'


const Button = React.forwardRef<HTMLButtonElement>(
  ({ ...props }, ref) => {
    const Comp = 'button'
    return (
      <div className={classes.buttonContainer}><Comp className={`${classes.submitButton}`} ref={ref} {...props} /></div>
    )
  },
)
Button.displayName = 'Button'

export { Button }
