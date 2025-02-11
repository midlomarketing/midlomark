import Header from '../../../app/(app)/components/CustomHeader'
import {Button, ButtonContainer} from '@/app/(app)/components/Button'
import {
  AButton,
  RichTextType
} from '@/app/(app)/utils/types'
import {ImageObject} from '@/app/(app)/components/Media/Media'
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {ContentContainer} from "@/app/(app)/components/PageLayout/ContentContainer";
import Grid from "@/app/(app)/components/PageLayout/Grid";
import classes from './index.module.scss'
import {
  ContentWithMediaProps
} from "@/payload-types";
import {RichText} from "@/app/(app)/components/RichText";

export function ContentWithMedia(props: ContentWithMediaProps) {

  const {
    active,
    headerSection,
    content,
    imageOrientation,
    textPosition,
    image,
    buttons
  } = props

  if (active && textPosition !== 'Foreground') {
    return (
      <SectionContainer>
        <ContentContainer>
          <Header {...headerSection} />
          <Grid reverse={textPosition === 'Left'}>
            <div className={classes.imageColumn}>
              {image?.image && typeof image.image !== 'string' && <ImageObject
                {...image.image}
                className={`${classes.image} ${imageOrientation}`}
              />}
            </div>
            <div
              className={`${classes.contentColumn} ${textPosition === 'Left' ? classes.contentReverse : undefined}`}>
              {content &&
                <RichText data={content}/>
              }
              {buttons && (
                <ButtonContainer>
                  {buttons.map((button: AButton) => (
                    <Button
                      key={button.id}
                      {...button}
                    />
                  ))}
                </ButtonContainer>
              )}
            </div>
          </Grid>
        </ContentContainer>
      </SectionContainer>
    )
  } else if (textPosition === 'Foreground' && active) {
    return (
      <SectionContainer className={classes.backgroundContainer}>
        {image?.image && typeof image.image !== 'string' && <ImageObject
          {...image.image}
          className={classes.backgroundImage}
        />}
        <div className={classes.contentContainer}>
          <div className={classes.blurBox}>
            <Header {...headerSection} />
            {content && <RichText data={content}/>}
            <ButtonContainer>
              {buttons?.map((button: AButton) => (
                <Button
                  key={button.id}
                  {...button}
                />
              ))}
            </ButtonContainer>
          </div>
        </div>
      </SectionContainer>
    )
  }
}
