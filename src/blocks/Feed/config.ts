import {Block} from 'payload'
import headerSection from "@/components/headerSection";

export const FeedBlock: Block = {
    slug: 'feed',
    labels: {
        singular: 'Feed Block',
        plural: 'Feed Blocks',
    },
    fields: [
        headerSection(),
        {
            name: 'active',
            label: 'Activate Block',
            type: 'checkbox',
            defaultValue: true,
        },
      {
        name: 'feedToAdd',
        type: 'radio',
        options: [{label: 'Blog', value: 'blog'}]
      },
      {
        name: 'feedCategory',
        type: 'relationship',
        relationTo: 'categories',
        hasMany: true,
      }
    ],
  interfaceName: 'PostFeed'
}
