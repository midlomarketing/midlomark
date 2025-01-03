import Header, {HeaderType} from '../../components/CustomHeader'
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {FAQItem} from "@/app/(app)/blocks/FAQ/Item";
import {RichTextType} from "@/app/(app)/utils/types";
import {ContentContainer} from "@/app/(app)/components/PageLayout/ContentContainer";
import classes from './index.module.scss'

export default function FAQ({active, headerSection,
                                FAQ
}:
                                {
                                    active?: boolean,
                                    headerSection: HeaderType
                                    FAQ: {
                                        question: RichTextType,
                                        answer: RichTextType,
                                        id: string
                                    }[]
                                }
) {
    if (active) {

        // TODO add FAQ schema
        return <SectionContainer>
            <ContentContainer>
                <Header {...headerSection} />
                <div className={classes.faqContainer}>
                    {/*{FAQ.map((faq, i) => (*/}
                    {/*    <FAQItem key={faq.id} faq={faq} />*/}
                    {/*))}*/}
                </div>
            </ContentContainer>
        </SectionContainer>
    }
}
