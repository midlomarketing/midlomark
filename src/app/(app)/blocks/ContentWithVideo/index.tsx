import Header, {HeaderType} from '../../components/CustomHeader'
import {SerializeLexical} from '../../components/RichText/Lexical'
import {VideoObject} from '../../components/Media/Media';
import {ImageObject as ImageObjectType} from '../../components/Media/Media/types';
import {RichTextType} from "@/app/(app)/utils/types";
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {ContentContainer} from "@/app/(app)/components/PageLayout/ContentContainer";
import classes from './index.module.scss'
import Grid from "@/app/(app)/components/PageLayout/Grid";

export default function ContentWithVideo({active, headerSection, video,
                                             content,
                                             textPosition}:
                                             {
                                                 active?: boolean;
                                                 headerSection: HeaderType;
                                                 textPosition: string;
                                                 video: {
                                                     video: string;
                                                     channel: string;
                                                     image: ImageObjectType
                                                     uploadDate: Date | string
                                                     description_html: string,
                                                     minutes: number | `${number}` | string,
                                                     seconds: number | `${number}` | string,
                                                     creatorName: string,
                                                     videoName: string,
                                                     displayVideoName?: boolean
                                                 };
                                                 content: RichTextType;
                                             }) {


    if (active) {
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
                            video={video}
                        />
                </Grid>
            </ContentContainer>
        </SectionContainer>
    }
}
