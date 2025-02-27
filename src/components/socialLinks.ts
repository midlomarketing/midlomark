import { Field } from 'payload'
import deepMerge from '../utilities/deepMerge'

type SocialLinks = (fieldToUse?: string, overrides?: Partial<Field>) => Field
const socialLinks: SocialLinks = (fieldToUse = 'name', overrides) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: 'socialLinks',
      interfaceName: 'socialLinksProps',
      type: 'array',
      admin: {
        components: {
          RowLabel: {
            path: 'src/components/socialLinksDescription.ts',
            exportName: 'SocialLinksDescription',
          },
        },
        initCollapsed: true,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'channel',
              type: 'select',
              options: [
                'YouTube',
                'Instagram',
                'Facebook',
                'Pinterest',
                'Vimeo',
                'Threads',
                'LinkedIn',
                'TikTok',
              ],
            },
            {
              name: 'fullLink',
              type: 'text',
            },
          ],
        },
      ],
    },
    overrides,
  )

export default socialLinks
