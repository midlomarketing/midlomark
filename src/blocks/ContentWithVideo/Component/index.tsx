import Header, {HeaderType} from '../../../app/(app)/components/CustomHeader'
import {SerializeLexical} from '../../../app/(app)/components/RichText/Lexical'
import {VideoObject} from '../../../app/(app)/components/Media/Media';
import {ImageObject as ImageObjectType} from '../../../app/(app)/components/Media/Media/types';
import {RichTextType} from "@/app/(app)/utils/types";
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {ContentContainer} from "@/app/(app)/components/PageLayout/ContentContainer";
import classes from './index.module.scss'
import Grid from "@/app/(app)/components/PageLayout/Grid";
import {ContentWithVideoProps} from "@/payload-types";

type Props = ContentWithVideoProps

export default function ContentWithVideo(props: Props) {

  const {
    active,
    headerSection,
    video,
    textPosition,
    content,
  } = props

    if (active && video) {
        return <SectionContainer>
            <ContentContainer>
                <Header {...headerSection}/>
                {video.displayVideoName && <h3 className={classes.videoName}>{video.videoName}</h3>}
                <Grid reverse={textPosition === 'Right'} className={classes.flexReverse}>
                        {content &&
                            <div
                                className={classes.contentContainer}>
                                <SerializeLexical className={classes.content}
                                                  nodes={content.root.children}/>
                            </div>
                        }
                  <VideoObject
                    className={classes.video}
                    {...video}
                  />
                </Grid>
            </ContentContainer>
        </SectionContainer>
    }
}
