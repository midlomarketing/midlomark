import {JSXConvertersFunction, LinkJSXConverter} from "@payloadcms/richtext-lexical/react";
import {DefaultNodeTypes, SerializedBlockNode} from "@payloadcms/richtext-lexical";
import {internalDocToHref} from "./internalLink";
import {textConverter} from "./textConverter";
import {relationshipConverter} from "./relationshipConverter";
import type {
  CardSection as CardSectionProps,
  ClientLogosProps,
  ContentNoMediaProps,
  ContentWithMapProps,
  ContentWithMediaProps,
  ContentWithVideoProps,
  CTAProps,
  FAQProps,
  FormBlock as FormBlockType,
  PainPointProps, PostFeed,
  SponsoredBlockProps,
  StepsProps,
  StepsWithIconsProps,
  SummaryProps,
  TableOfContentsProps
} from "@/payload-types";
import {CTA} from "@/blocks/CTAs/Component";
import {ContentWithVideo} from "@/blocks/ContentWithVideo/Component";
import {ContentWithMap} from "@/blocks/ContentWithMap/Component";
import {ContentNoMedia} from "@/blocks/ContentNoMedia/Component";
import {ContentWithMedia} from "@/blocks/ContentWithMedia/Component";
import {CardSection} from "@/blocks/Cards/Component";
import {ClientLogos} from "@/blocks/ClientLogos/Component";
import {FAQ} from "@/blocks/FAQBlock/Component";
import {FormBlock} from "@/blocks/Form/Component";
import {PainPoints} from "@/blocks/PainPoints/Component";
import {SponsoredSection} from "@/blocks/SponsoredBlock/Component";
import {Steps} from "@/blocks/Steps/Component";
import {StepsWithIcons} from "@/blocks/StepsWithIcons/Component";
import {Summary} from "@/blocks/Summary/Component";
import {TableOfContents} from "@/blocks/TableOfContents/Component";


type NodeTypes = DefaultNodeTypes
  | SerializedBlockNode<ContentWithVideoProps
  | ContentWithMapProps
  | ContentWithMediaProps
  | CTAProps
  | CardSectionProps
  | ClientLogosProps
  | ContentNoMediaProps
  | FAQProps
  | FormBlockType
  | PainPointProps
  | SponsoredBlockProps
  | StepsProps
  | StepsWithIconsProps
  | SummaryProps
  | TableOfContentsProps
>

export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({defaultConverters}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({internalDocToHref}),
  ...textConverter,
  ...relationshipConverter,
  blocks : {
    cta: ({node}) => <CTA {...node.fields} />,
    contentWithVideo: ({node}) => <ContentWithVideo {...node.fields} />,
    contentWithMap: ({node}) => <ContentWithMap {...node.fields} />,
    contentWithMedia: ({node}) => <ContentWithMedia {...node.fields} />,
    cardSection: ({node}) => <CardSection {...node.fields} />,
    clientLogos: ({node}) => <ClientLogos {...node.fields} />,
    contentNoMedia: ({node}) => <ContentNoMedia {...node.fields} />,
    faqBlock: ({node}) => <FAQ {...node.fields} />,
    // @ts-ignore
    formBlock: ({node}) => <FormBlock enableIntro={true} {...node.fields} />,
    painPoints: ({node}) => <PainPoints {...node.fields} />,
    sponsoredBlock: ({node}) => <SponsoredSection {...node.fields} />,
    steps: ({node}) => <Steps {...node.fields} />,
    stepsWithIcons: ({node}) => <StepsWithIcons {...node.fields} />,
    summaryBlock: ({node}) => <Summary {...node.fields} />,
    tableOfContents: ({node}) => <TableOfContents {...node.fields} />,
  }
})
