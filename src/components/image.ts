import { Field } from 'payload'
import deepMerge from '../utilities/deepMerge'

type Image = (fieldToUse?: string, overrides?: Partial<Field>) => Field
const image: Image = (fieldToUse = 'name', overrides) =>
  deepMerge<Field, Partial<Field>>(
    {
      type: 'group',
      name: 'image',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Recommended size is 640x360 (16:9 aspect ratio)',
          },
        },
        {
          name: 'imagePosition',
          type: 'select',
          options: [
            { label: 'Top', value: 'backgroundTop' },
            { label: 'Bottom', value: 'backgroundBottom' },
            { label: 'Center', value: 'backgroundCenter' },
            { label: 'Left', value: 'backgroundLeft' },
            { label: 'Right', value: 'backgroundRight' },
          ],
          defaultValue: 'backgroundCenter',
          admin: {
            description:
              'Choose how you want to align the background image in the hero section. This does not change the placement of the image in the flow of the page.',
          },
        },
      ],
    },
    overrides,
  )

export default image
