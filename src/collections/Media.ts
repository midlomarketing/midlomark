import { CollectionConfig } from 'payload'
import { userPerms } from '@/utilities/permissions'

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: (req) => userPerms(req),
    update: (req) => userPerms(req),
    delete: (req) => userPerms(req),
  },
  upload: {
    staticDir: 'media',
    formatOptions: {
      format: 'webp',
    },
    mimeTypes: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'],
    adminThumbnail: ({ doc }) => `${process.env.R2_SERVER}/${doc.filename}`,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Media',
    enableRichTextRelationship: true,
    defaultColumns: ['fileName', 'altDescription', 'thumbnailUrl', 'title'],
  },

  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'altDescription',
      type: 'text',
      maxLength: 150,
      admin: {
        components: {
          Description: {
            path: '/src/components/seoDescription.ts',
            exportName: 'SeoDescription',
            clientProps: { length: 150 },
          },
        },
      },
    },
    {
      name: 'credit',
      type: 'group',
      fields: [
        {
          name: 'creator',
          type: 'text',
          admin: {
            description: 'Leave a name for who or what created or captured this image.'
          }
        },
        {
          name: 'creatorType',
          type: 'select',
          options: [
            {value: 'Person', label: 'Person'},
            {value: 'Organization', label: 'Organization'}
          ],
          admin: {
            description: 'Choose if the creator is an organization or a person.'
          }
        },
        {
          name: 'creatorLink',
          type: 'text',
          admin: {
            description: `Link to the creator's website`
          }
        }
      ]
    }
  ],
}

export { Media }
