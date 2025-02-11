import Header from "../../../app/(app)/components/CustomHeader"
import {RichText} from "@/app/(app)/components/RichText";
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {ContentContainer} from "@/app/(app)/components/PageLayout/ContentContainer";
import classes from './index.module.scss'
import {SponsoredBlockProps} from "@/payload-types";

type Props = SponsoredBlockProps

export function SponsoredSection(props: Props) {

  const { active,
    headerSection,
    sponsoredContent,
    link
  } = props

  if (active) {
    return (
      <SectionContainer>
        <ContentContainer className={classes.sponsoredContainer}>
          <Header {...headerSection} />
          {sponsoredContent && <RichText data={sponsoredContent}/>}
          <div className={classes.linkContainer}>
            <a rel="sponsored noopener noreferrer" target="_blank" className={classes.link}
               href={link?.destination! || ``} aria-label={link?.title!} title={link?.title!}>{link?.cta}
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
}
