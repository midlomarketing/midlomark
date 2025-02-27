import { Block } from 'payload'
import image from '../../components/image'
import positionSelector from '../../components/positionSelector'
import buttons from '../../components/buttons'
import headerSection from '../../components/headerSection'
import {lexicalEditor} from '@payloadcms/richtext-lexical'

const ContentWithMedia: Block = {
  slug: 'contentWithMedia',
  fields: [
      {
            name: 'active',
            label: 'Activate Block',
            type: 'checkbox',
            defaultValue: true,
        },
    headerSection(),
    image(),
    {
      name: 'imageOrientation',
      type: 'select',
      options: ['landscape', 'square'],
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({}),
    },
    buttons(),
    positionSelector(),
  ],
  interfaceName: 'ContentWithMediaProps'
}

export default ContentWithMedia
