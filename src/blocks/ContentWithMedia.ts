import { Block } from 'payload'
import image from '../components/image'
import positionSelector from '../components/positionSelector'
import buttons from '../components/buttons'
import headerSection from '../components/headerSection'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

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
}

export default ContentWithMedia

// example
// /Users/nick/Desktop/Business/Midlo Web Design/midlomark/public/tempExamples/3cd1634604e8f87165da4314be915fd7147720b9e639b308fad8331155ffc99e35b70afb46c55512a89ada16f26a952eb01b20bc8eab6e680bed5afb6c8594aa.jpeg