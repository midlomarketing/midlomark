import {ReactNode} from 'react'
import classes from './index.module.scss'

export function ContentContainer({children, className}: {
    children: ReactNode, className?: string
}) {
    return <div className={`${className} ${classes.contentContainer}`}>{children}</div>
}
