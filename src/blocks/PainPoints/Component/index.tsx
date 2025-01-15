import Header from "../../../app/(app)/components/CustomHeader"
import {ImageObject} from "@/app/(app)/components/Media/Media"
import {RichText} from "@/app/(app)/components/RichText";
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {Button, ButtonContainer} from "@/app/(app)/components/Button";
import {ContentContainer} from "@/app/(app)/components/PageLayout/ContentContainer";
import Grid from "@/app/(app)/components/PageLayout/Grid";
import classes from './index.module.scss'
import {PainPointProps} from "@/payload-types";

type Props = PainPointProps

export function PainPoints(props: Props) {

  const {
    active,
    headerSection,
    painPoints,
  } = props

  if (active) {
    return <SectionContainer>
      <ContentContainer>
        <Header {...headerSection} />
        <Grid>
          {painPoints?.map((point, index) => (
            <div key={index} className={classes.painPointContainer}>
              <div className={classes.imageContainer}>
                {point?.image?.image && typeof point.image.image !== 'string' && <ImageObject
                  {...point.image.image}
                />}
              </div>
              <div
                className={classes.contentContainer}>
                {point.painPoint && <RichText data={point.painPoint}/>}
                {point.buttons && point.buttons.length > 0 && (
                  <ButtonContainer>
                    {point.buttons.map((button) => (
                      <Button
                        {...button}
                        key={button.id}
                      />
                    ))}
                  </ButtonContainer>
                )}
              </div>
            </div>
          ))}
        </Grid>
      </ContentContainer>
    </SectionContainer>
  }

}
