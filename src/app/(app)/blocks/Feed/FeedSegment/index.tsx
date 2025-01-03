import classes from './index.module.scss'

export function FeedSegment({ children }: { children?: React.ReactNode }) {
  return (
    <section>
      <div className={classes.feedSection}>{children}</div>
    </section>
  )
}
