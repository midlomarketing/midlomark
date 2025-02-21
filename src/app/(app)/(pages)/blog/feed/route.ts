import { getPayload } from 'payload'
import configPromise from '@payload-config'
//@ts-ignore
import RSS from 'rss'
import {getServerSideURL} from "@/utilities/getURL";
import {Category, User} from "@/payload-types";


export const revalidate = 86400


const payload = await getPayload({ config: configPromise })
export async function GET() {
  const feedXml = await generateRssFeed()
  if (feedXml) {
    return new Response(feedXml, {
      headers: {
        'Content-Type': 'application/atom+xml; charset=utf-8',
      },
    })
  } else {
    return new Response('Error generating RSS feed.')
  }
}

const generateRssFeed = async () => {

  const url = getServerSideURL()

  const posts = await payload.find({
    collection: 'posts',
    limit: 100,
  })

  const {businessName} = await payload.findGlobal({
    slug: 'global-settings',
    select: {
      businessName: true
    }
  })

  try {
    const feed = new RSS({
      title: `Posts from ${businessName}`,
      description: `The post feed for ${businessName}.`,
      feed_url: `${url}/blog/feed.xml`,
      site_url: `${url}`,
      image_url: `${process.env.CLOUDFLARE_BUCKET}/${
        typeof posts.docs[0].content?.image?.image !== 'string' &&
        posts.docs[0].content?.image?.image?.filename
      }`,
      language: `en-us`,
    })

    posts.docs.map(({ title, slug, content, date}) => {
      feed.item({
        title: `${title}`,
        guid: `${url}/posts/${slug}`,
        url: `${url}/posts/${slug}`,
        description: content?.description || '',
        date: new Date(date || ``),
        author: content?.authors?.map((author: User) => author.name),
        categories: content?.category?.map((category: Category) => category.title),
        enclosure: content?.image?.image && typeof content.image.image !== 'string' && {
          url: `${process.env.CLOUDFLARE_BUCKET}/${content.image.image.filename}`,
          size: content.image.image.filesize,
          type: content.image.image.mimeType,
        },
      })
    })

    return feed.xml({ indent: true })
  } catch (error) {
    return null
  }
}
