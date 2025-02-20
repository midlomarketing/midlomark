import {Block} from 'payload'
import image from '../../components/image'
import headerSection from '../../components/headerSection'
import {FixedToolbarFeature, lexicalEditor} from "@payloadcms/richtext-lexical";
import buttons from "@/components/buttons";

const CardSection: Block = {
  slug: 'cardSection',
  fields: [
    {
      name: 'active',
      label: 'Activate Block',
      type: 'checkbox',
      defaultValue: true,
    },
    headerSection(),
    {
      name: 'card',
      type: 'array',
      admin: {
        components: {
          RowLabel: {
            path: 'src/components/cardSectionLabels.ts',
            exportName: 'CardSectionLabels',
          },
        },
        initCollapsed: true,
      },
      minRows: 2,
      maxRows: 4,
      fields: [
        image(),
        {
          name: 'cardHeader',
          type: 'text',
          admin: {
            description: 'Title of the image card.',
          },
        },
        {
          name: 'cardText',
          type: 'richText',
          editor: lexicalEditor({
            features: ({defaultFeatures}) => [
              ...defaultFeatures.filter((feature) => ['underline', 'bold', 'italic'].includes(feature.key)),
              FixedToolbarFeature(),
            ]
          }),
          admin: {
            description: 'Description of the image card.',
          },
        },
        {
          name: 'includeButton',
          type: 'checkbox',
          defaultValue: false
        },
        buttons({
          admin: {condition: (_, {includeButton}) => Boolean(includeButton),}
        }),
      ],
      interfaceName: 'CardArray',
    },
  ],
  interfaceName: 'CardSection',
}

export default CardSection
