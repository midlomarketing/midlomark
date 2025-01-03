import {CSSProperties, ReactNode} from 'react'
import classes from './index.module.scss'

export function SectionContainer({children, className, style}: {
    children: ReactNode, className?: string, style?: CSSProperties
}) {
    return <section className={`${className} ${classes.sectionContainer}`} style={style}>{children}</section>
}
