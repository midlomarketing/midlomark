import { Field } from 'payload'
import deepMerge from '../utilities/deepMerge'

type SEO = (fieldToUse?: string, overrides?: Partial<Field>) => Field

const seo: SEO = (fieldToUse = 'name', overrides) =>
  deepMerge<Field, Partial<Field>>({
    type: 'group',
    name: 'seo',
    label: 'SEO',
    fields: [
      {
        type: 'text',
        name: 'metaTitle',
        maxLength: 65,
        admin: {
          components: {
            Description: {
              path: '/src/components/seoDescription.ts',
              exportName: 'SeoDescription',
              clientProps: { length: 65 },
            },
          },
        },
      },
      {
        type: 'text',
        name: 'metaDescription',
        maxLength: 160,
        admin: {
          components: {
            Description: {
              path: '/src/components/seoDescription.ts',
              exportName: 'SeoDescription',
              clientProps: { length: 160 },
            },
          },
        },
      },
      {
        type: 'relationship',
        name: 'seoAbout',
        label: 'About Entities',
        relationTo: 'entitySeo',
        hasMany: true,
        admin: {
          position: 'sidebar',
        },
      },
      {
        type: 'relationship',
        name: 'seoMentions',
        label: 'Entity Mentions',
        relationTo: 'entitySeo',
        hasMany: true,
        admin: {
          position: 'sidebar',
        },
      },
    ],
  })

export default seo
