import Header, {HeaderType} from "../../components/CustomHeader"
import {SerializeLexical} from "../../components/RichText/Lexical"
import {LinkType,
    RichTextType
} from "../../utils/types"
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {ContentContainer} from "@/app/(app)/components/PageLayout/ContentContainer";
import classes from './index.module.scss'

export default function SponsoredSection({headerSection, link,
                                             sponsoredContent
}: {
    headerSection: HeaderType
    link: LinkType
    sponsoredContent: RichTextType
}) {
    return (
        <SectionContainer>
            {/* Sponsored content breaks the flow of the post, so this header should be different from the rest of the headers */}
            <ContentContainer className={classes.sponsoredContainer}>
                <Header {...headerSection} />
                <SerializeLexical nodes={sponsoredContent.root.children}/>
                <div className={classes.linkContainer}>
                    <a rel="sponsored noopener noreferrer" target="_blank" className={classes.link}
                       href={link.destination} aria-label={link.title} title={link.title}>{link.cta}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                        </svg>
                    </a>
                    <p className={classes.sponsored}>sponsored</p>
                </div>
            </ContentContainer>
        </SectionContainer>
    )
}
