import { Post, Page } from '@/payload-types'
import { Metadata } from 'next'

export const meta = async (args: { doc: Page | Post }): Promise<Metadata> => {

  const { doc } = args || {}
  const meta = doc?.meta

  const ogImage = typeof doc?.meta?.image === 'object' &&
    doc.meta.image !== null &&
    `${process.env.CLOUDFLARE_BUCKET}/${doc.meta.image.filename}`

  return {
    title: meta?.title || 'MidloMark Boilerplate',
    description: meta?.description || '',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || ''),
    alternates: {
      canonical: meta?.canonical,
    },
    openGraph: {
      title: meta?.title || 'MidloMark Boilerplate',
      description: meta?.description || '',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${doc?.slug && Array.isArray(doc?.slug) ? doc?.slug.join('/') : ''}`,
      siteName: meta?.siteName || 'MidloMark',
      images: ogImage
        ? [
          {
            url: ogImage
          }
        ] : undefined,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta?.title || 'MidloMark Boilerplate',
      description: meta?.description || ``,
      images: ogImage
        ? [
          {
            url: ogImage,
          }
        ] : undefined,
    },
  }
}
