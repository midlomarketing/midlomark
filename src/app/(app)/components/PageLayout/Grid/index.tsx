import classes from './index.module.scss'
export default function Grid({children, className, reverse}: {children: React.ReactNode, className?: string, reverse?: boolean}) {
    return <div className={`${classes.grid} ${className} ${reverse ? classes.reverse : undefined}`}>{children}</div>
}