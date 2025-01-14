import ContentNoMedia from '../../blocks/ContentNoMedia'
// import FeedToAdd from '../../blocks/Feed/FeedToAdd'
import ContentWithMedia from '../../blocks/ContentWithMedia'
import CardSection from '../../blocks/CardSection'
import CTA from '../../blocks/CTA'
import ContentWithMap from '../../blocks/ContentWithMap'
import ContentWithVideo from '../../blocks/ContentWithVideo'
import ClientLogos from '../../blocks/ClientLogos'
import FAQ from '../../blocks/FAQ'
import {PainPoints} from '../../blocks/PainPoints'
import SponsoredSection from '../../blocks/SponsoredSection'
import Steps from '../../blocks/Steps'
import StepsWithIcons from '../../blocks/StepsWithIcons'
import Summary from "@/app/(app)/blocks/Summary";
import TableOfContents from '../../blocks/TableOfContents'
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
          image={blocks.image.image}
          textPosition={blocks.textPosition}
          content={blocks.content}
          buttons={blocks.buttons}
          header={blocks.headerSection}
          aspectRatio={blocks.imageOrientation}
          active={blocks?.active || true}
        />
      )
    case 'cardSection':
      return (
        <CardSection
          headerSection={blocks.headerSection}
          cards={blocks.card}
          active={blocks?.active || true}
        />
      )
    case 'contentWithVideo':
      return <ContentWithVideo {...blocks} />
    case 'cta':
      return <CTA button={blocks.buttons}/>
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
