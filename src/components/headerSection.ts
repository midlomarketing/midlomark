import { Field } from 'payload'
import deepMerge from '../utilities/deepMerge'

type HeaderSection = (overrides?: Partial<Field>) => Field
const headerSection: HeaderSection = (overrides) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: 'headerSection',
      type: 'group',
      fields: [
        {
          name: 'headerText',
          type: 'text',
        },
        {
          name: 'headerLevel',
          type: 'select',
          options: ['h2', 'h3', 'h4', 'h5', 'h6'],
          defaultValue: 'h2',
        },
        {
          name: 'anchor',
          type: 'text',
        },
      ],
    },
    overrides,
  )

export default headerSection
