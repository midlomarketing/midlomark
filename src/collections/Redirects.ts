import { CollectionConfig } from 'payload'
import { userPerms } from '@/utilities/permissions'
import {revalidateRedirects} from "@/collections/hooks/revalidateRedirects";

const companyDomain = ``

const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
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
      name: 'source',
      type: 'text',
    },
    {
      name: 'destination',
      type: 'text',
      admin: {
        description: `If redirecting to another page within ${companyDomain}, just include the path (/path/sub-path). If it's an external redirect, include the whole URL (https://example.com)`,
      },
    },
    {
      defaultValue: false,
      name: 'permanent',
      type: 'checkbox',
    },
    {
      defaultValue: false,
      name: 'external',
      admin: {
        description: `Do you want this redirect to point to a domain other than ${companyDomain}?`,
      },
      type: 'checkbox',
    },
  ],
  hooks: {
    afterChange: [revalidateRedirects]
  }
}

export { Redirects }
