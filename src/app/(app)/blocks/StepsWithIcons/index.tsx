import Header, {HeaderType} from "../../components/CustomHeader"
import {ImageObject as ImageObjectType} from "../../components/Media/Media/types"
import {ImageObject} from "../../components/Media/Media"
import {SerializeLexical} from "../../components/RichText/Lexical"
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {ContentContainer} from "@/app/(app)/components/PageLayout/ContentContainer";
import {RichTextType} from "@/app/(app)/utils/types";
import classes from './index.module.scss'
import {Media as MediaProps} from '@/payload-types'

export default function StepsWithIcons({
                                           active, headerSection, steps
                                       }: {
    active?: boolean,
    headerSection: HeaderType
    steps: {
        image: MediaProps
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
                            <ImageObject
                              {...step.image}
                            />
                            <SerializeLexical nodes={step.content?.root.children}/>
                        </div>
                    ))}
                </div>
            </ContentContainer>
        </SectionContainer>
    }
}
