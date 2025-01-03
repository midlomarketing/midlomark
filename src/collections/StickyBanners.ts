import { CollectionConfig } from 'payload'
import { userPerms } from '@/utilities/permissions'

const StickyBanners: CollectionConfig = {
  slug: 'stickyBanners',
  admin: {
    group: 'Admin',
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: (req) => userPerms(req),
    update: (req) => userPerms(req),
    delete: (req) => userPerms(req),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      admin: {
        description: 'Include an informative title.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        description: 'Include a brief message.',
      },
    },
  ],
}

export { StickyBanners }
