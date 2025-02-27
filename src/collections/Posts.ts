import {CollectionConfig} from 'payload'
import image from '../components/image'
import slug from '../components/slug'
import {adminPerms, userPerms} from '@/utilities/permissions'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML
} from '@payloadcms/richtext-lexical'
import {revalidatePosts} from "@/collections/hooks/revalidatePosts";
import {revalidatePath} from "next/cache.js";
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField
} from "@payloadcms/plugin-seo/fields";
import TableOfContents from "@/blocks/TableOfContents/config";
import Config from "@/blocks/ContentNoMedia/config";
import ContentWithMedia from "@/blocks/ContentWithMedia/config";
import {FormBlock} from "@/blocks/Form/config";


const Posts: CollectionConfig = {
  slug: 'posts',
  versions: {
    drafts: {
      autosave: {
        interval: 300
      }
    }
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', 'date', 'featured'],
    livePreview: {url: ({data}) => `http://localhost:3000/blog/${data.slug}`,}
  },
  access: {
    read: (req) => adminPerms(req),
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
      name: 'status',
      type: 'select',
      options: ['Draft', 'Published'],
      defaultValue: 'Published',
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Feature this post?',
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'date',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'MMM dd, yyyy hh:mm a',
        },
        position: 'sidebar',
      },
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
        // hidden: true
      },
      required: false,
      hooks: {
        beforeChange: [
          async ({data}) => {
            if (data) {
              return `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${data.slug}`
            }
          }
        ],
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          label: 'Content',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              maxLength: 300,
              admin: {
                components: {
                  Description: {
                    path: '/src/components/ContentDescription.ts',
                    exportName: 'ContentDescription',
                    clientProps: {
                      length: 300,
                      customMessage: 'Use this to add a short blurb to be used on the featured blog and in search.',
                    },
                  },
                },
              },
            },
            {
              name: 'summary',
              type: 'textarea',
              maxLength: 280,
              admin: {
                components: {
                  Description: {
                    path: '/src/components/ContentDescription.ts',
                    exportName: 'ContentDescription',
                    clientProps: {
                      length: 280,
                      customMessage: 'Use this to add a summary of the post used on the post page.',
                    },
                  },
                },
              },
              hooks: {
                afterChange: [
                  async ({req, data, siblingData}) => {
                    if (data?.featured) {
                      req.payload.logger.info('Revalidating blog page')
                      revalidatePath('/blog')
                    }
                  }
                ]
              }
            },
            {
              name: 'richText',
              type: 'richText',
              editor:
                lexicalEditor({
                  features: ({defaultFeatures}) =>
                    [...defaultFeatures.filter((feature) =>
                      !['superscript', 'subscript', 'indent', 'align', 'inlineCode'].includes(feature.key)),
                      FixedToolbarFeature(),
                      BlocksFeature({
                        blocks: [
                          TableOfContents,
                          Config,
                          ContentWithMedia,
                          FormBlock,
                        ],
                      }),
                      HTMLConverterFeature({})]
                }),
            },
            {
              type: 'row',
              fields: [
                {
                  type: 'relationship',
                  name: 'authors',
                  relationTo: 'users',
                  hasMany: true,
                  admin: {
                    width: '50%',
                  },
                  filterOptions: () => {
                    return {
                      isAuthor: {
                        equals: true
                      }
                    }
                  },
                },
                {
                  type: 'relationship',
                  name: 'category',
                  relationTo: 'categories',
                  hasMany: true,
                  maxRows: 2,
                  admin: {
                    width: '50%'
                  }
                },
              ],
            },
            {
              type: 'group',
              name: 'media',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'checkbox',
                      name: 'includeAudio',
                      label: 'Would you like to include an audio link?',
                      defaultValue: false,
                      admin: {width: '50%'}
                    },
                    {
                      type: 'checkbox',
                      name: 'includeVideo',
                      label: 'Would you like to include a video?',
                      defaultValue: false,
                      admin: {width: '50%'}
                    },
                  ]
                },
                {
                  type: 'text',
                  name: 'audio',
                  admin: {
                    description: 'Include a direct link to podcast audio.',
                    condition: (data, siblingData) => {
                      if (siblingData.includeAudio) {
                        return true
                      } else {
                        return false
                      }
                    }
                  },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'radio',
                      name: 'videoHost',
                      label: 'Where is the video hosted?',
                      options: [
                        {value: 'youtube', label: 'YouTube'},
                        {value: 'vimeo', label: 'Vimeo'}
                      ],
                      defaultValue: 'youtube'
                    },
                    {
                      type: 'text',
                      name: 'youtube',
                      admin: {
                        description: 'Use the "youtu.be" share link',
                        condition: (data, siblingData) => {
                          if (siblingData.videoHost === 'youtube') {
                            return true
                          } else {
                            return false
                          }
                        },
                        width: '100%'
                      },
                    },
                    {
                      type: 'text',
                      name: 'vimeo',
                      admin: {
                        description: 'Only include the numbers after the "vimeo" portion of the link',
                        condition: (data, siblingData) => {
                          if (siblingData.videoHost === 'vimeo') {
                            return true
                          } else {
                            return false
                          }
                        },
                        width: '100%'
                      },
                    },
                  ],
                  admin: {
                    condition: (data, siblingData) => {
                      if (siblingData.includeVideo) {
                        return true
                      } else {
                        return false
                      }
                    }
                  }
                },
              ],
            },
            image(),
            lexicalHTML('richText', {name: 'richText_html'}),
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
              hasGenerateFn: true,
            }),
            MetaDescriptionField({
              hasGenerateFn: true,
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
                beforeChange: [
                  async ({data}) => {
                    if (data) {
                      return `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${data.slug}`
                    }
                  }
                ],
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
      ]
    },
  ],
  hooks: {
    afterChange: [revalidatePosts],
    afterOperation:
      [async ({operation, req}) => {
        if (operation === 'create' || operation === 'deleteByID') {
          req.payload.logger.info(`Revalidating messages and homepage`)
          revalidatePath('/blog')
        }
      }]
  }
}

export {Posts}
