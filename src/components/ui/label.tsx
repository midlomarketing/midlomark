'use client'
import * as LabelPrimitive from '@radix-ui/react-label'
import * as React from 'react'
import classes from './index.module.scss'

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root className={`${classes.label} visually-hidden ${className}`} ref={ref} {...props} />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
