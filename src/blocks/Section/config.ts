import {Block} from 'payload'
import headerSection from "@/components/headerSection";
import ContentWithMedia from "@/blocks/ContentWithMedia/config";
import ContentNoMedia from "@/blocks/ContentNoMedia/config";

const Section: Block = {
  slug: 'section',
  labels: {
    plural: 'Sections',
    singular: 'Section'
  },
  fields: [
    {
      name: 'active',
      label: 'Activate Block',
      type: 'checkbox',
      defaultValue: true,
    },
    headerSection(),
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [
        ContentWithMedia,
        ContentNoMedia,
      ]
    }
  ],
  interfaceName: 'SectionProps',
}

export default Section
