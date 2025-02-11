import { Field } from 'payload'
import deepMerge from '../utilities/deepMerge'

type Button = (fieldToUse?: string, overrides?: Partial<Field>) => Field
const buttons: Button = (fieldToUse = 'name', overrides) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: 'buttons',
      interfaceName: 'Button',
      type: 'array',
      label: 'CTA buttons',
      admin: {
        components: {
          RowLabel: {
            path: 'src/components/ButtonLabel.ts',
            exportName: 'ButtonLabel',
          },
        },
        initCollapsed: true,
      },
      maxRows: 2,
      labels: {
        singular: 'Button',
        plural: 'Buttons',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'linkType',
          type: 'radio',
          options: ['External', 'Internal'],
          defaultValue: 'External',
        },
        {
          name: 'link',
          type: 'text',
          admin: {
            condition: (data, siblingData, { user }) => {
              if (siblingData.linkType === 'External') {
                return true
              } else {
                return false
              }
            },
          }
        },
        {
          name: 'internalLink',
          type: 'relationship',
          relationTo: ['industries', 'pages', 'posts'],
          admin: {
            condition: (data, siblingData, { user }) => {
              if (siblingData.linkType === 'Internal') {
                return true
              } else {
                return false
              }
            },
          }
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Should this open in a new browser window/tab?',
          },
        },
        {
          name: 'isPrimary',
          type: 'checkbox',
        },
      ],
    },
    overrides,
  )

export default buttons
