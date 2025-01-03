import { Field } from 'payload'
import deepMerge from '../utilities/deepMerge'

type Date = (fieldToUse?: string, overrides?: Partial<Field>) => Field
const date: Date = (fieldToUse = 'name', overrides) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: 'date',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'MMM dd, yyyy hh:mm a',
        },
        position: 'sidebar',
      },
    },
    overrides,
  )

export default date
