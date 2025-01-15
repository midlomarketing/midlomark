import Header from "@/app/(app)/components/CustomHeader";
import classes from './index.module.scss'
import Grid from "@/app/(app)/components/PageLayout/Grid";
import {SummaryProps} from "@/payload-types";

type Props = SummaryProps

export default function Summary(props: Props) {

  const { active, headerSection, summary} = props

  if (active) {
    // TODO this will have a different layout, but just getting it on screen for now
    // TODO may include this in either a blog detail column or as an <aside> on a blog on the left
    return <Grid>
      <div className={classes.summaryContainer}>
        {headerSection ? <Header {...headerSection} className={classes.summaryHeader}/> :
          <h2 className={classes.summaryHeader}>Summary</h2>}
        <p className={classes.summaryText}>{summary}</p>
      </div>
    </Grid>
  }
}
