import Header, {HeaderType} from '../../components/CustomHeader'
import {SerializeLexical} from '../../components/RichText/Lexical'
import {
  AButton,
  RichTextType
} from '@/app/(app)/utils/types'
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {ContentContainer} from "@/app/(app)/components/PageLayout/ContentContainer";
import classes from './index.module.scss'

export default function ContentNoMedia(
  {
    headerSection,
    content,
    active,
    includeBgColor
  }: {
    headerSection: HeaderType
    buttons: AButton[]
    content: RichTextType
    active?: boolean
    includeBgColor?: boolean
  }) {
  if (active) {
    return (<SectionContainer className={includeBgColor ? classes.background : ``}>
      <ContentContainer className={classes.addedPadding}>
        {headerSection && <Header className={classes.header} {...headerSection} />}
        {content && (<SerializeLexical className={includeBgColor ? classes.bodyText : ``} nodes={content.root.children}/>)}
      </ContentContainer>
    </SectionContainer>)
  }
}
