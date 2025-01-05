import {CollectionConfig} from 'payload'
import {userPerms} from '@/utilities/permissions'
import slug from "@/components/slug";
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField
} from "@payloadcms/plugin-seo/fields";
import {lexicalEditor} from "@payloadcms/richtext-lexical";

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    group: 'Content Meta',
  },
  access: {
    read: () => true,
    create: (req) => userPerms(req),
    update: (req) => userPerms(req),
    delete: (req) => userPerms(req),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slug(),
    {
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          label: 'Category',
          fields: [
            {
              name: 'description',
              type: 'richText',
              editor:
                lexicalEditor({
                  features: ({defaultFeatures}) => [...defaultFeatures],
                }),
            },
          ]
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            })
          ]
        },
        {
          label: 'Related Docs',
          fields: [
            {
              name: 'relatedDocs',
              type: 'join',
              on: 'content.category',
              collection: 'posts'
            }
          ]
        }
      ]
    },
  ],
}
