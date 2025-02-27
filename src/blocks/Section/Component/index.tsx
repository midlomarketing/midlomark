import Header from "../../../app/(app)/components/CustomHeader";
import {SectionProps} from "@/payload-types";
import {RenderBlocks} from "@/app/(app)/components/RenderBlocks";

type Props = SectionProps

export function SectionBlock(props: Props) {

  const {
    active,
    headerSection,
    blocks,
  } = props

  if (active) {
    return <div>
      <Header {...headerSection} />
      {/* @ts-ignore */}
      {blocks && <RenderBlocks blocks={blocks}/>}
    </div>

  }
}
