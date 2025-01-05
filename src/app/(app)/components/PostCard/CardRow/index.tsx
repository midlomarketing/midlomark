import classes from "./index.module.scss";


export function CardRow({children}: { children: React.ReactNode }) {
  return <div className={classes.cardRow}>
    {children}
  </div>
}
