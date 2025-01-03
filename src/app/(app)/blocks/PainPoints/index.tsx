import Header, {HeaderType} from "../../components/CustomHeader"
import {ImageObject} from "../../components/Media/Media"
import {ImageObject as ImageType} from "../../components/Media/Media/types"
import {SerializedLexicalNode} from 'lexical'
import {SerializeLexical} from "../../components/RichText/Lexical"
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {Button, ButtonContainer} from "@/app/(app)/components/Button";
import {AButton} from "@/app/(app)/utils/types";
import {ContentContainer} from "@/app/(app)/components/PageLayout/ContentContainer";
import Grid from "@/app/(app)/components/PageLayout/Grid";
import classes from './index.module.scss'

export function PainPoints({active, headerSection, painPoints}: {
  active?: boolean,
  headerSection: HeaderType
  painPoints: {
    image: ImageType
    buttons?: AButton[]
    painPoint: {
      root: {
        children: SerializedLexicalNode[] | undefined
      }
      id: string
    }
  }[]
}) {
  if (active) {
    return <SectionContainer>
      <ContentContainer>
        <Header {...headerSection} />
        <Grid>
          {painPoints.map((point, index) => (
            <div key={index} className={classes.painPointContainer}>
              <div className={classes.imageContainer}>
                <ImageObject
                  filename={point?.image?.image?.filename || ''}
                  width={point?.image?.image?.width || 640}
                  height={point?.image?.image?.height || 360}
                  altDescription={point?.image?.image?.altDescription || ''}
                  creator={point?.image?.image?.credit?.creator || ''}
                  creatorLink={point?.image?.image?.credit?.creatorLink || ''}
                  creatorType={point?.image?.image?.credit?.creatorLink || ''}
                />
              </div>
              <div
                className={classes.contentContainer}>
                <SerializeLexical nodes={point.painPoint.root.children}/>
                {point.buttons && point.buttons.length > 0 && (
                  <ButtonContainer>
                    {point.buttons.map((button: AButton) => (
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
