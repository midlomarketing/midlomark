import Header from "../../../app/(app)/components/CustomHeader"
import {ImageObject} from "@/app/(app)/components/Media/Media"
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {ContentContainer} from "@/app/(app)/components/PageLayout/ContentContainer";
import classes from './index.module.scss'
import {ClientLogosProps} from '@/payload-types'

type Props = ClientLogosProps

export function ClientLogos(props: Props) {

  const {active, headerSection, logos} = props

  if (active) {
    return <SectionContainer>
      <ContentContainer>
        <Header {...headerSection}/>
        <div
          className={classes.logos}>{logos?.map((logo, index) => (
          logo.image?.image && typeof logo.image.image !== 'string' &&
          <ImageObject key={logo.id} className={classes.logo}
                       {...logo.image.image}
          />
        ))}</div>
      </ContentContainer>
    </SectionContainer>
  }
}
