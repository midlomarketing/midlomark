import ContentNoMedia from '../../../../blocks/ContentNoMedia/Component'
// import FeedToAdd from '../../blocks/Feed/FeedToAdd'
import ContentWithMedia from '../../../../blocks/ContentWithMedia/Component'
import CardSection from '../../../../blocks/Cards/Component'
import CTA from '../../../../blocks/CTAs/Component'
import ContentWithMap from '../../../../blocks/ContentWithMap/Component'
import ContentWithVideo from '../../../../blocks/ContentWithVideo/Component'
import ClientLogos from '../../../../blocks/ClientLogos/Component'
import FAQ from '../../../../blocks/FAQBlock/Component'
import {PainPoints} from '@/blocks/PainPoints/Component'
import SponsoredSection from '../../../../blocks/SponsoredBlock/Component'
import Steps from '../../../../blocks/Steps/Component'
import StepsWithIcons from '../../../../blocks/StepsWithIcons/Component'
import Summary from "src/blocks/Summary/Component";
import TableOfContents from '../../../../blocks/TableOfContents/Component'
import {FormBlock} from "@/blocks/Form/Component";


// @ts-ignore
export function ShowBlocks({blocks}) {
  switch (blocks.blockType) {
    case 'formBlock':
      return <FormBlock id={blocks?.anchor} enableIntro={blocks?.enableIntro} introContent={blocks?.introContent} form={blocks?.form} />
    case 'contentNoMedia':
      return (
        <ContentNoMedia
          {...blocks}
          active={blocks?.active || true}
        />
      )
    case 'contentWithMedia':
      return (
        <ContentWithMedia
          {...blocks}
        />
      )
    case 'cardSection':
      return (
        <CardSection
          {...blocks}
        />
      )
    case 'contentWithVideo':
      return <ContentWithVideo {...blocks} />
    case 'cta':
      return <CTA {...blocks} />
    case 'clientLogos':
      return <ClientLogos {...blocks} />
    case 'faqBlock':
      return <FAQ {...blocks} />
    case 'painPoints':
      return <PainPoints {...blocks} />
    case 'sponsoredBlock':
      return <SponsoredSection {...blocks} />
    case 'steps':
      return <Steps {...blocks} />
    case 'stepsWithIcons':
      return <StepsWithIcons {...blocks} />
    case 'summaryBlock':
      return <Summary {...blocks} />
    case 'tableOfContents':
      return <TableOfContents {...blocks} />
    case 'contentWithMap':
      return (
        <ContentWithMap
          {...blocks}
        />
      )
    // TODO add a feed block to allow blogs or other resources to be inserted anywhere
    // TODO maybe do this with dropdowns instead for more control? or should it only be related content?

    // case 'feed':
    //   return <FeedToAdd feedToAdd={blocks.feedToAdd} />
    default:
      return null
  }
}
