// import { Metadata } from 'next'
// import { meta } from '@/app/(app)/components/Metadata'
// import { getPayload } from 'payload'
// import configPromise from '@payload-config'
// import Messages from '@/app/(app)/(pages)/blog/page'
// import {getPayloadHMR} from "@payloadcms/next/utilities";
// import {GlobalSetting} from "../../../../../../../payload-types";
// import {getCachedGlobal} from "@/app/(app)/utils/getGlobals";
//
// // export const revalidate = 3600
//
//
// const payload = await getPayloadHMR({ config: configPromise })
//
// type Params = {
//   params: {
//     page: string
//   }
// }
//
// const messageQuery = {
//   date: {
//     less_than_equal: new Date(),
//   },
// }
//
// const mostRecent = await payload.find({
//   collection: `messages`,
//   where: messageQuery,
//   limit: 1,
// })
//
// const featuredItem = mostRecent.docs[0]
//
// export async function generateStaticParams() {
//   try {
//     const pages = await payload.find({
//       collection: 'messages',
//       where: {
//         'sidebar.status': { not_equals: 'Draft' },
//         date: {
//           less_than_equal: new Date(),
//         },
//       },
//     })
//
//     if (pages) {
//       return Array.from(Array(pages.totalPages + 1).keys())
//         .filter((i) => i !== 0)
//         .map((i) => ({ pageNo: i.toString() }))
//     } else {
//       return []
//     }
//   } catch (error) {
//     return []
//   }
// }
//
// export async function generateMetadata({ params }: Params): Promise<Metadata> {
//   const { page } = params
//
//   // const globals = await payload.findGlobal({
//   //   slug: 'global-settings',
//   // })
//
//     const globals: GlobalSetting = await getCachedGlobal('global-settings', 1)()
//
//
//   const metadataObj = {
//     metaTitle: `Page ${page}: All series from Local Vineyard Church`,
//     metaDescription: `Page ${page}: Browse all series by The Local Vineyard Church.`,
//   }
//
//   const { metaTitle, metaDescription } = metadataObj
//
//   return meta({
//     title: metaTitle,
//     description: metaDescription,
//     canonical: `${globals.churchDomain}/messages`,
//     images: [
//       {
//         url: `${process.env.CLOUDFLARE_BUCKET}/${
//           typeof featuredItem?.featuredImage?.image !== 'string' &&
//           featuredItem?.featuredImage?.image?.filename
//         }`,
//         width:
//           (typeof featuredItem?.featuredImage?.image !== 'string' &&
//             featuredItem?.featuredImage?.image?.width) ||
//           640,
//         height:
//           (typeof featuredItem?.featuredImage?.image !== 'string' &&
//             featuredItem?.featuredImage?.image?.height) ||
//           360,
//       },
//     ],
//     url: new URL(`${globals.churchDomain}/messages`),
//     siteName: globals.churchName || ``,
//   })
// }
//
// export default async function PaginatedMessages({ params }: Params) {
//   return <Messages params={params} />
// }
