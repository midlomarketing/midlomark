import Header from "../../../app/(app)/components/CustomHeader"
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {ContentContainer} from "@/app/(app)/components/PageLayout/ContentContainer";
import classes from './index.module.scss'
import {StepsProps} from "@/payload-types";

type Props = StepsProps

export function Steps(props: Props) {

  const {active, headerSection,
  steps} = props

    if (active) {
        return <SectionContainer>
            <ContentContainer>
                <Header {...headerSection} />
                <div className={classes.stepContainer}>
                    {steps?.map((step, i) => (
                        <div className={classes.step} key={step.id}>
                            <p className={classes.stepText}>{step.step}</p>
                        </div>
                    ))}
                </div>
            </ContentContainer>
        </SectionContainer>
    }
}
