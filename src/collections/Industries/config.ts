import {CollectionConfig} from 'payload'
import Config from '../../blocks/ContentNoMedia/config'
import ContentWithMedia from '../../blocks/ContentWithMedia/config'
import contentWithMap from '../../blocks/ContentWithMap/config'
import cardSection from '../../blocks/Cards/config'
import buttons from '../../components/buttons'
import image from '../../components/image'
import slug from '../../components/slug'
import cta from '../../blocks/CTAs/config'
import ContentWithVideo from '../../blocks/ContentWithVideo/config'
import {userPerms} from '@/utilities/permissions'
import {revalidatePage} from "@/collections/hooks/revalidatePage";
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import clientLogos from "@/blocks/ClientLogos/config";
import FAQBlock from "@/blocks/FAQBlock/config";
import PainPoints from "@/blocks/PainPoints/config";
import SponsoredBlock from "@/blocks/SponsoredBlock/config";
import Steps from "@/blocks/Steps/config";
import StepsWithIcons from "@/blocks/StepsWithIcons/config";
import Summary from "@/blocks/Summary/config";
import TableOfContents from "@/blocks/TableOfContents/config";
import {lexicalEditor} from "@payloadcms/richtext-lexical";
import {HighlightFeature} from "@/utilities/features/colorAccent/server";
import {createCanonical} from "@/collections/Industries/hooks";
import {FormBlock} from "@/blocks/Form/config";
import {FeedBlock} from "@/blocks/Feed/config";

const Industries: CollectionConfig = {
  slug: 'industries',
  versions: true,
  access: {
    read: () => true,
    create: (req) => userPerms(req),
    update: (req) => userPerms(req),
    delete: (req) => userPerms(req),
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    livePreview: {url: ({data}) => `http://localhost:3000/industries/${data.slug}`,}
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    slug('title'),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          name: 'hero',
          fields: [
            {
              name: 'headline',
              type: 'text',
            },
            {
              name: 'subtext',
              type: 'richText',
              editor: lexicalEditor({
                features: ({defaultFeatures}) => [...defaultFeatures,
                  HighlightFeature()
                ]
              }),
            },
            {
              name: 'textPosition',
              type: 'radio',
              options: ['Left', 'Right'],
              defaultValue: 'Left',
            },
            buttons(),
            image(),
          ],
          interfaceName: 'HeroProps',
        },
        {
          label: 'Content',
          name: 'content',
          fields: [
            {
              name: 'content',
              type: 'blocks',
              label: false,
              blocks: [
                Config,
                ContentWithMedia,
                contentWithMap,
                cardSection,
                cta,
                ContentWithVideo,
                clientLogos,
                FAQBlock,
                PainPoints,
                SponsoredBlock,
                Steps,
                StepsWithIcons,
                Summary,
                TableOfContents,
                FormBlock,
                FeedBlock
              ],
            },
          ],
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
            MetaDescriptionField({

            }),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
            {
              name: 'canonical',
              type: 'text',
              admin: {
                description: 'Include an alternative URL. Overwrites the default URL.'
              },
              hooks: {
                beforeChange: [createCanonical]
              }
            },
            {
              name: 'siteName',
              type: 'text',
              defaultValue: 'MidloMark'
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
          ]
        },
      ],
    },
    {
      name: 'pageStatus',
      type: 'select',
      options: ['Draft', 'Published'],
      admin: {
        position: 'sidebar',
      },
    },

  ],
  hooks: {
    afterChange: [revalidatePage],
  }
}

export {Industries}
