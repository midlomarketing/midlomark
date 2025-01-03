import Header, {HeaderType} from "../../components/CustomHeader"
import {ImageObject as ImageObjectType} from "../../components/Media/Media/types"
import {ImageObject} from "../../components/Media/Media"
import {SerializeLexical} from "../../components/RichText/Lexical"
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {ContentContainer} from "@/app/(app)/components/PageLayout/ContentContainer";
import {RichTextType} from "@/app/(app)/utils/types";
import classes from './index.module.scss'

export default function StepsWithIcons({
                                           active, headerSection, steps
                                       }: {
    active?: boolean,
    headerSection: HeaderType
    steps: {
        image: ImageObjectType
        step: string
        id: string
        content?: RichTextType
    }[]
}) {
    if (active) {
        return <SectionContainer>
            <ContentContainer>
                <Header {...headerSection} />
                <div className={classes.stepContainer}>
                    {steps.map((step, index) => (
                        <div key={step.id} className={classes.step}>
                            <h3 className={classes.stepHeader}>{step.step}</h3>
                            <ImageObject filename={step?.image?.image?.filename || ''}
              width={step?.image?.image?.width || 640}
              height={step?.image?.image?.height || 360}
              altDescription={step?.image?.image?.altDescription || ''}
              creator={step?.image?.image?.credit?.creator || ''}
              creatorLink={step?.image?.image?.credit?.creatorLink || ''}
              creatorType={step?.image?.image?.credit?.creatorLink || ''} className={classes.icon}/>
                            <SerializeLexical nodes={step.content?.root.children}/>
                        </div>
                    ))}
                </div>
            </ContentContainer>
        </SectionContainer>
    }
}
