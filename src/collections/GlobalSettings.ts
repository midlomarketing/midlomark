import { GlobalConfig } from 'payload'
import socialLinks from '../components/socialLinks'
import { userPerms } from '@/utilities/permissions'
import {revalidateGlobalSettings} from "@/collections/hooks/revalidateGlobalSettings";

const GlobalSettings: GlobalConfig = {
  slug: 'global-settings',
  admin: {
    group: 'Admin',
  },
  access: {
    read: () => true,
    update: (req) => userPerms(req),
  },
  fields: [
    {
      name: 'businessName',
      type: 'text',
      admin: {
        description:
          'Changes the name in some places, including the copyright information in the footer.',
      },
    },
    {
      name: 'domain',
      type: 'text',
      admin: {
        description:
          'Sets the base URL of your site. (ex. https://example.com - include the https://).',
      },
    },
    {
      name: 'googleTagManagerCode',
      type: 'text',
      admin: {
        description: 'GTM-XXXXXXX',
      },
    },
    {
      name: 'phone',
      type: 'group',
      fields: [
        {
          name: 'phoneNumber',
          type: 'text',
          admin: {
            description: 'Your phone number in the format +15551234567',
          },
        },
        {
          name: 'displayPhoneNumber',
          type: 'text',
          admin: {
            description: 'How you want the phone number to look on your site.',
          },
        },
      ],
    },
    {
      name: 'includeMenu',
      label: 'Include the menu in the footer?',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'footerAddresses',
      type: 'group',
      fields: [
        {
          name: 'addresses',
          type: 'array',
          maxRows: 2,
          fields: [
            {
              name: 'address',
              type: 'relationship',
              relationTo: 'addresses',
            },
          ],
        },
      ],
    },
    {
      name: 'logos',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'squareLogo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'darkModeSquare',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'landscapeLogo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'darkModeLandscape',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
    socialLinks(),
    {
      name: 'stickyBanner',
      type: 'relationship',
      relationTo: 'stickyBanners',
    },
  ],
  hooks: {
    afterChange: [revalidateGlobalSettings]
  }
}

export { GlobalSettings }
