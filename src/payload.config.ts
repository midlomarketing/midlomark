import path from 'path'
import {BlocksFeature, FixedToolbarFeature, lexicalEditor} from '@payloadcms/richtext-lexical'
import {mongooseAdapter} from '@payloadcms/db-mongodb'
import {buildConfig} from 'payload'
import sharp from 'sharp'
import {fileURLToPath} from 'url'
import {resendAdapter} from '@payloadcms/email-resend'
import {
  StickyBanners,
  Categories,
  Addresses,
  Nav,
  Media,
  Pages,
  GlobalSettings,
  Posts,
  Users,
  Redirects,
  Footer,
} from '@/collections'
import {seoPlugin} from '@payloadcms/plugin-seo'
import {formBuilderPlugin} from "@payloadcms/plugin-form-builder";
import {searchPlugin} from '@payloadcms/plugin-search'
import {s3Storage} from '@payloadcms/storage-s3'
import ContentWithMedia from '@/blocks/ContentWithMedia/config'
import EntitySeo from '@/collections/EntitySeo'
import {Page, Post} from '@/payload-types'
import {GenerateDescription, GenerateImage, GenerateTitle, GenerateURL} from '@payloadcms/plugin-seo/types'
import {Industries} from "@/collections/Industries/config";
import {searchFields} from '@/search/fieldOverrides'
import {beforeSyncWithSearch} from '@/search/beforeSync'
import type {Media as MediaProps} from './payload-types'

const generateTitle: GenerateTitle<Post | Page> = ({doc}) => {
  return doc?.title ? `${doc.title} | Boilerplate` : 'Boilerplate'
}

const generateDescription: GenerateDescription<Post> = ({doc}) => {
  return doc?.content?.description || ``
}

const generateURL: GenerateURL<Post | Page> = ({doc}) => {
  return doc?.slug && doc?.slug !== 'home'
    ? `${process.env.NEXT_PUBLIC_SITE_URL!}/${doc.slug}`
    : process.env.NEXT_PUBLIC_SITE_URL!
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)


const iconUrl = 'https://images.midlomark.com/Midlo%20Web%20Design%20_Icon%20Full.webp'
const darkIconUrl = `https://images.midlomark.com/Midlo%20Web%20Design%20_Icon%20White.webp`
const logoUrl = 'https://images.midlomark.com/LIVE%20TN.webp'


// TODO create a README to remind me what I need to do each time I spin up the boiler plate

export default buildConfig({
  editor: lexicalEditor({
    features: ({defaultFeatures}) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      BlocksFeature({
        blocks: [ContentWithMedia],
      }),
    ],
  }),
  defaultDepth: 1,
  collections: [
    Pages,
    Categories,
    Posts,
    Media,
    Users,
    Addresses,
    Redirects,
    EntitySeo,
    StickyBanners,
    Industries
  ],
  plugins: [
    formBuilderPlugin({
      fields: {
        text: true,
        textarea: true,
        email: true,
        message: true,
        select: true,
        checkbox: true,
        country: false,
        payment: false,
        state: false,
      },
      defaultToEmail: 'nick@midlowebdesign.com',
      formOverrides: {
        admin: {
          group: 'Forms'
        }
      },
      formSubmissionOverrides: {
        admin: {
          group: 'Forms',
        },
      }
    }),
    s3Storage({
      collections: {
        ['media']: true,
      },
      bucket: process.env.S3_BUCKET_NAME || ``,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || ``,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || ``,
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
      },
    }),
    seoPlugin({
      generateURL,
      generateTitle,
      generateImage: ({doc}) => doc?.content?.image.image,
      generateDescription: ({doc}) => doc?.content?.description,
      uploadsCollection: 'media',
    }),
    searchPlugin({
      collections: ['posts', 'pages'],
      beforeSync: beforeSyncWithSearch,
      searchOverrides: {
        fields: ({defaultFields}) => {
          return [...defaultFields, ...searchFields]
        },
        admin: {
          group: 'Admin',
        }
      }
    })
  ],
  globals: [Nav, GlobalSettings, Footer],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
  cors: [
    `${process.env.PAYLOAD_PUBLIC_SERVER_URL}`,
  ],
  csrf: [
    `${process.env.PAYLOAD_PUBLIC_SERVER_URL}`,
  ],
  admin: {
    components: {
      graphics: {
        Icon: {
          path: '/src/components/Icon.tsx',
          exportName: 'Icon'
        },
        Logo: {
          path: '/src/components/Logo.tsx',
          exportName: 'Logo'
        },
      },
    },
    livePreview: {
      collections: ['industries', 'posts', 'pages']
    },
    meta: {
      titleSuffix: '- MidloMark',
      description:
        'This is the MidlMark CMS. Edit and add pages, blogs, and more to the website.',
      icons: [
        {
          url: iconUrl,
          sizes: '16x16 32x32 48x48 64x64',
          type: 'image/webp',
          rel: 'icon',
        },
        {
          media: '(prefers-color-scheme: dark)',
          url: darkIconUrl,
          sizes: '16x16 32x32 48x48 64x64',
          type: 'image/webp',
          rel: 'icon',
        },
      ],
      openGraph: {
        description:
          'This is the MidloMark CMS. Edit and add pages, blogs, and more to the website.',
        siteName: 'MidloMark',
        images: [
          {
            url: logoUrl,
          },
        ],
      },
    },
    user: Users.slug,
    autoLogin: {
      email: 'dev@payloadcms.com',
      password: 'test',
    },
    routes: {
      logout: '/logout',
    },
  },
  email: resendAdapter({
    defaultFromAddress: 'nick@midlowebdesign.com',
    defaultFromName: 'Nick',
    apiKey: process.env.RESEND_API_KEY!,
  }),
  async onInit(payload) {
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: 'users',
        // @ts-ignore
        data: {
          email: 'dev@payloadcms.com',
          password: 'test',
          name: 'test',
          role: 'admin',
        },
      })
    }
  },
  sharp,
})
