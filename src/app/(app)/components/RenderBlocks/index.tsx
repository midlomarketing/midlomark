import {ContentNoMedia} from '@/blocks/ContentNoMedia/Component'
import {ContentWithMedia} from '@/blocks/ContentWithMedia/Component'
import {CardSection} from '@/blocks/Cards/Component'
import {CTA} from '@/blocks/CTAs/Component'
import {ContentWithMap} from '@/blocks/ContentWithMap/Component'
import {ContentWithVideo} from '@/blocks/ContentWithVideo/Component'
import {ClientLogos} from '@/blocks/ClientLogos/Component'
import {FAQ} from '@/blocks/FAQBlock/Component'
import {PainPoints} from '@/blocks/PainPoints/Component'
import {SponsoredSection} from '@/blocks/SponsoredBlock/Component'
import {Steps} from '@/blocks/Steps/Component'
import {StepsWithIcons} from '@/blocks/StepsWithIcons/Component'
import {Summary} from "@/blocks/Summary/Component";
import {TableOfContents} from '@/blocks/TableOfContents/Component'
import {FormBlock} from "@/blocks/Form/Component";
import {FeedSegment} from "@/blocks/Feed/Component";
import type {Page, Post} from "@/payload-types";
import {Fragment} from "react";
import {SectionBlock} from "@/blocks/Section/Component";

const blockComponents = {
  contentNoMedia: ContentNoMedia,
  contentWithMedia: ContentWithMedia,
  cardSection: CardSection,
  cta: CTA,
  contentWithMap: ContentWithMap,
  contentWithVideo: ContentWithVideo,
  clientLogos: ClientLogos,
  faqBlock: FAQ,
  painPoints: PainPoints,
  sponsoredSection: SponsoredSection,
  Steps: Steps,
  stepsWithIcons: StepsWithIcons,
  summary: Summary,
  tableOfContents: TableOfContents,
  formBlock: FormBlock,
  feed: FeedSegment,
  section: SectionBlock
}

export const RenderBlocks: React.FC<{
  blocks: Page['content'] | Post['content']
}> = (props) => {
  const {blocks} = props
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return <Fragment>
      {blocks.map((block, i) => {
        const {blockType} = block

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType]

          if (Block) {
            return <div key={i}>
              <Block {...block} />
            </div>
          }
          return null
        }

      })}
    </Fragment>
  }
  return null
}
