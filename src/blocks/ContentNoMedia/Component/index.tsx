import Header from '../../../app/(app)/components/CustomHeader'
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {ContentContainer} from "@/app/(app)/components/PageLayout/ContentContainer";
import classes from './index.module.scss'
import {RichText} from "@/app/(app)/components/RichText";
import {ContentNoMediaProps} from "@/payload-types";

export default function ContentNoMedia(props: ContentNoMediaProps) {

  const {active, includeBgColor, headerSection, content} = props

  if (active) {
    return (<SectionContainer className={includeBgColor ? classes.background : ``}>
      <ContentContainer className={classes.addedPadding}>
        {headerSection && <Header className={classes.header} {...headerSection} />}
        {content && (<RichText className={includeBgColor ? classes.bodyText : ``} data={content}/>)}
      </ContentContainer>
    </SectionContainer>)
  }
}
