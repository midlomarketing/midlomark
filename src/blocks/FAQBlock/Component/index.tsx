import Header from '../../../app/(app)/components/CustomHeader'
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {ContentContainer} from "@/app/(app)/components/PageLayout/ContentContainer";
import classes from './index.module.scss'
import {FAQProps} from "@/payload-types";
import {FAQItem} from "@/blocks/FAQBlock/Component/Item";

type Props = FAQProps

export default function FAQ(props: Props) {

  const {active,
  headerSection,
    FAQ
  } = props

    if (active) {

        // TODO add FAQ schema
        return <SectionContainer>
            <ContentContainer>
                <Header {...headerSection} />
                <div className={classes.faqContainer}>
                    {FAQ?.map((faq, i) => (
                        <FAQItem key={faq.id} {...faq} />
                    ))}
                </div>
            </ContentContainer>
        </SectionContainer>
    }
}
