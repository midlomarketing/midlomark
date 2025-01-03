import { GlobalConfig } from 'payload'
import { userPerms } from '@/utilities/permissions'
import {revalidateNav} from "@/collections/hooks/revalidateNav";

const Nav: GlobalConfig = {
  access: {
    read: () => true,
    update: (req) => userPerms(req),
  },
  admin: {
    group: 'Admin',
  },
  fields: [
    {
      name: 'navigationLink',
      admin: {
        components: {
          RowLabel: {
            path: 'src/components/NavLinkLabel.ts',
            exportName: 'NavLinkLabel',
          },
        },
        initCollapsed: true,
      },
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'linkType',
          type: 'radio',
          options: ['External', 'Internal', 'No Link'],
          defaultValue: 'Internal',
        },
        {
          name: 'openInNewTab',
          type: 'radio',
          options: ['Yes', 'No'],
          admin: {
            description: 'Should this open in a new browser window/tab?',
          },
        },
        {
          name: 'externalLink',
          type: 'text',
          admin: {
            condition: (data, siblingData) => {
              if (siblingData.linkType === 'External') {
                return true
              } else {
                return false
              }
            },
          },
        },
        {
          name: 'link',
          type: 'relationship',
          relationTo: ['pages', 'posts'],
          admin: {
            condition: (data, siblingData) => {
              if (siblingData.linkType === 'Internal') {
                return true
              } else {
                return false
              }
            },
          },
        },
        {
          name: 'nestedLinks',
          type: 'array',
          admin: {
            initCollapsed: true,
          },
          maxRows: 1,
          fields: [
            {
              name: 'navigationLink',
              admin: {
                components: {
                  RowLabel: {
                    path: 'src/components/NavLinkLabel.ts',
                    exportName: 'NavLinkLabel',
                  },
                },
                initCollapsed: true,
              },
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                },
                {
                  name: 'linkType',
                  type: 'radio',
                  options: ['External', 'Internal'],
                  defaultValue: 'Internal',
                },
                {
                  name: 'openInNewTab',
                  type: 'radio',
                  options: ['Yes', 'No'],
                  admin: {
                    description: 'Should this open in a new browser window/tab?',
                  },
                },
                {
                  name: 'externalLink',
                  type: 'text',
                  admin: {
                    condition: (data, siblingData) => {
                      if (siblingData.linkType === 'External') {
                        return true
                      } else {
                        return false
                      }
                    },
                  },
                },
                {
                  name: 'link',
                  type: 'relationship',
                  relationTo: ['pages', 'posts'],
                  admin: {
                    condition: (data, siblingData) => {
                      if (siblingData.linkType === 'Internal') {
                        return true
                      } else {
                        return false
                      }
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  slug: 'nav',
  hooks: {
    afterChange: [revalidateNav]
  }
}

export { Nav }
