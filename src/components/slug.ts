import { Field } from 'payload'
import formatSlug from '../utilities/formatSlug'
import deepMerge from '../utilities/deepMerge'

type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field

// By dynamically building fields in code configurations are reusable and concise
const slug: Slug = (fieldToUse = 'title', overrides) =>
  deepMerge<Field, Partial<Field>>({
    name: 'slug',
    label: 'Slug',
    type: 'text',
    unique: true,
    admin: {
      position: 'sidebar',
      // readOnly: true,
    },
    hooks: {
      beforeValidate: [formatSlug(fieldToUse)],
    },
  })

export default slug
