import { CollectionConfig } from 'payload'
import { userPerms } from '@/utilities/permissions'

const Addresses: CollectionConfig = {
  slug: 'addresses',
  admin: {
    useAsTitle: 'locationName',
    group: 'Admin',
  },
  access: {
    read: () => true,
    create: (req) => userPerms(req),
    update: (req) => userPerms(req),
    delete: (req) => userPerms(req),
  },
  fields: [
    {
      name: 'locationName',
      type: 'text',
      required: true,
    },
    {
      name: 'streetAddress',
      type: 'text',
      required: true,
    },
    {
      name: 'optionalAdditionalStreetAddress',
      type: 'text',
    },
    {
      name: 'city',
      type: 'text',
      required: true,
    },
    {
      name: 'state',
      type: 'text',
      required: true,
    },
    {
      name: 'zip',
      type: 'text',
      required: true,
    },
    {
      name: 'country',
      type: 'text',
    },
  ],
}

export { Addresses }
