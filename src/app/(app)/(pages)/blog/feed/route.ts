// import { getPayload } from 'payload'
// import configPromise from '@payload-config'
// //@ts-ignore
// import RSS from 'rss'
// import {getPayloadHMR} from "@payloadcms/next/utilities";
//
// export const revalidate = 86400
//
//
// const payload = await getPayloadHMR({ config: configPromise })
// export async function GET() {
//   const feedXml = await generateRssFeed()
//   if (feedXml) {
//     return new Response(feedXml, {
//       headers: {
//         'Content-Type': 'application/atom+xml; charset=utf-8',
//       },
//     })
//   } else {
//     return new Response('Error generating RSS feed.')
//   }
// }
//
// const generateRssFeed = async () => {
//   const messages = await payload.find({
//     collection: 'messages',
//     limit: 104,
//   })
//
//   try {
//     const feed = new RSS({
//       title: `Messages from The Local Vineyard Church`,
//       description: `The messages feed for Local Vineyard Church.`,
//       feed_url: `https://localvineyard.church/messages/feed.xml`,
//       site_url: `https://localvineyard.church`,
//       image_url: `${process.env.CLOUDFLARE_BUCKET}/${
//         typeof messages.docs[0].featuredImage?.image !== 'string' &&
//         messages.docs[0].featuredImage?.image?.filename
//       }`,
//       language: `en-us`,
//     })
//
//     messages.docs.map((message) => {
//       feed.item({
//         title: `${message.name}`,
//         guid: `https://localvineyard.church/messages/${
//           typeof message.meta?.series !== 'string' && message.meta?.series
//             ? `${message.meta.series.slug}/`
//             : ``
//         }${message.slug}`,
//         url: `https://localvineyard.church/messages/${
//           typeof message.meta?.series !== 'string' && message.meta?.series
//             ? `${message.meta.series.slug}/`
//             : ``
//         }${message.slug}`,
//         description: message.summary,
//         date: new Date(message.date || ``),
//         author:
//           (typeof message.meta?.speaker !== 'string' &&
//             message.meta?.speaker?.map((speaker) => typeof speaker !== 'string' && speaker.name)) ||
//           [],
//         categories:
//           (typeof message.meta?.category !== 'string' &&
//             message.meta?.category?.map(
//               (category) => typeof category !== 'string' && category.name,
//             )) ||
//           [],
//         enclosure: {
//           url: `${process.env.CLOUDFLARE_BUCKET}/${
//             typeof message.featuredImage?.image !== 'string' &&
//             message.featuredImage?.image?.filename
//           }`,
//           size:
//             typeof message.featuredImage?.image !== 'string' &&
//             message.featuredImage?.image?.filesize,
//           type:
//             typeof message.featuredImage?.image !== 'string' &&
//             message.featuredImage?.image?.mimeType,
//         },
//       })
//     })
//
//     return feed.xml({ indent: true })
//   } catch (error) {
//     return null
//   }
// }
