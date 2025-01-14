import Header, {HeaderType} from '../../components/CustomHeader'
import {Button, ButtonContainer} from '../../components/Button'
import {SerializeLexical} from '../../components/RichText/Lexical'
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
  Media as MediaProps,
  Button as ButtonProps
} from "@/payload-types";

export default function ContentWithMedia({header, buttons, content, image, textPosition, aspectRatio, active}: {
  header: HeaderType
  buttons: ButtonProps
  content: RichTextType
  image: MediaProps
  textPosition: string
  aspectRatio: string
  active?: boolean
}) {
  let ratio

  switch (aspectRatio) {
    case 'landscape':
      ratio = 'landscape-aspect'
      break
    case 'square':
      ratio = 'square-aspect'
      break
    default:
      ratio = 'auto-aspect'
      break
  }

  if (active && textPosition !== 'Foreground') {
    return (
      <SectionContainer>
        <ContentContainer>
          <Header {...header} />
          <Grid reverse={textPosition === 'Left'}>
            <div className={classes.imageColumn}>
              <ImageObject
                image={image}
                className={`${classes.image} ${aspectRatio}`}
              />
            </div>
            <div
              className={`${classes.contentColumn} ${textPosition === 'Left' ? classes.contentReverse : undefined}`}>
              {content &&
                <SerializeLexical nodes={content.root.children}/>
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
        <ImageObject
          image={image}
          className={classes.backgroundImage}
        />
        <div className={classes.contentContainer}>
          <div className={classes.blurBox}>
            <Header {...header} />
            {content && <SerializeLexical nodes={content.root.children}/>}
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
