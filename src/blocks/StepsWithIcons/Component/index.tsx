import Header from "../../../app/(app)/components/CustomHeader"
import {ImageObject} from "@/app/(app)/components/Media/Media"
import {RichText} from "@/app/(app)/components/RichText/"
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {ContentContainer} from "@/app/(app)/components/PageLayout/ContentContainer";
import classes from './index.module.scss'
import {StepsWithIconsProps} from '@/payload-types'

type Props = StepsWithIconsProps

export function StepsWithIcons(props: Props) {

  const { active, headerSection, steps } = props

    if (active) {
        return <SectionContainer>
            <ContentContainer>
                <Header {...headerSection} />
                <div className={classes.stepContainer}>
                    {steps?.map((step, index) => (
                        <div key={step.id} className={classes.step}>
                            <h3 className={classes.stepHeader}>{step.step}</h3>
                          {step?.image?.image && typeof step.image.image !== 'string' && <ImageObject
                            {...step.image.image}
                          />}
                          {step.content && <RichText data={step.content}/>}
                        </div>
                    ))}
                </div>
            </ContentContainer>
        </SectionContainer>
    }
}
