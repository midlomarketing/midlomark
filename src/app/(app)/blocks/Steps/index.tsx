import Header, {HeaderType} from "../../components/CustomHeader"
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {ContentContainer} from "@/app/(app)/components/PageLayout/ContentContainer";
import classes from './index.module.scss'

export default function Steps({active, headerSection, steps}: {
    active?: boolean
    headerSection: HeaderType
    steps: {
        step: string
        id: string
    }[]
}) {
    if (active) {
        return <SectionContainer>
            <ContentContainer>
                <Header {...headerSection} />
                <div className={classes.stepContainer}>
                    {steps.map((step, i) => (
                        <div className={classes.step} key={step.id}>
                            <p className={classes.stepText}>{step.step}</p>
                        </div>
                    ))}
                </div>
            </ContentContainer>
        </SectionContainer>
    }
}