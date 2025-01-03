import { Field } from 'payload'
import deepMerge from '../utilities/deepMerge'

type Sidebar = (fieldToUse?: string, overrides?: Partial<Field>) => Field
const sidebar: Sidebar = (fieldToUse = 'name', overrides) =>
  deepMerge<Field, Partial<Field>>(
    {
      type: 'group',
      name: 'sidebar',
      fields: [
        {
          type: 'checkbox',
          name: 'showLength',
          defaultValue: false,
          admin: {
            description: 'Reveal the length field.',
          },
        },
        {
          type: 'text',
          name: 'length',
          admin: {
            description: 'The length of the message, album, or song. Does not appear on events.',
            condition: (data, siblingData) => {
              return siblingData.showLength
            },
          },
        },
        {
          name: 'status',
          type: 'select',
          options: ['Draft', 'Published'],
          defaultValue: 'Published',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    overrides,
  )

export default sidebar
