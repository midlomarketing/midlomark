import type {Block} from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'active',
      label: 'Activate Block',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'anchor',
      type: 'text',
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, {enableIntro}) => Boolean(enableIntro),
      },
      editor: lexicalEditor({
        features: ({rootFeatures}) => {
          return [
            ...rootFeatures,
            HeadingFeature({enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4']}),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
  ],
  labels: {
    plural: 'Form Blocks',
    singular: 'Form Block',
  },
}
