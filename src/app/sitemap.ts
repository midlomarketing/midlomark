// import {getAllGroups} from './(app)/utils/fetchData'
// import _ from 'lodash'
// import {MetadataRoute} from 'next'
// import {getPayload} from 'payload'
// import configPromise from '@payload-config'
// import {getPayloadHMR} from "@payloadcms/next/utilities";
// import {GlobalSetting} from "../../payload-types";
// import {getCachedGlobal} from "@/app/(app)/utils/getGlobals";
//
// export const revalidate = 86400
//
// const payload = await getPayloadHMR({config: configPromise})
//
// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//     const activeQuery = {
//         endDate: {
//             greater_than_equal: new Date(),
//         },
//         'sidebar.status': {
//             not_equals: 'Draft',
//         },
//     }
//
//     const baseUrl = `https://localvineyard.church`
//     const generalPages = await payload.find({
//         collection: 'pages',
//     })
//     const events = await payload.find({
//         collection: 'events',
//         where: activeQuery,
//         limit: 520,
//     })
// // const globals = await payload.findGlobal({
// //   slug: 'global-settings',
// // })
//
//     const globals: GlobalSetting = await getCachedGlobal('global-settings', 1)()
//
//     const smallGroupsActive = globals.smallGroupsActive
//     const messages = await payload.find({
//         collection: 'messages',
//         limit: 520,
//     })
//     const series = await payload.find({
//         collection: 'series',
//         limit: 520,
//     })
//     const groupId = globals.groupId
//     const groups = await getAllGroups().then((res) => res.json())
//     const allGroups = groups.data
//         .filter(
//             (i: { relationships: { group_type: { data: { id: string | null | undefined } } } }) =>
//                 i.relationships.group_type.data.id === groupId,
//         )
//         .filter(
//             (item: { attributes: { events_visibility: string } }) =>
//                 item.attributes.events_visibility === 'public',
//         )
//         .sort((a: { attributes: { name: string } }, b: { attributes: { name: string } }) =>
//             b.attributes.name > a.attributes.name ? -1 : 1,
//         )
//     return [
//         {
//             url: baseUrl,
//             lastModified: new Date(messages.docs[0].updatedAt),
//         },
//         ...generalPages.docs
//             .filter((page) => page.slug !== 'home')
//             .filter((page) => page.slug !== 'small-groups')
//             .map((page) => ({
//                 url: `https://localvineyard.church/${page.slug}`,
//                 lastModified: new Date(page.updatedAt),
//             })),
//         {
//             url: `${baseUrl}/series`,
//             lastModified: new Date(series.docs[0].updatedAt),
//         },
//         smallGroupsActive
//             ? {
//                 url: `${baseUrl}/small-groups`,
//                 lastModified: new Date(allGroups[0].attributes.created_at),
//             }
//             : '',
//         ...messages.docs.map((page) => ({
//             url: `https://localvineyard.church/messages/${
//                 typeof page.meta?.series !== 'string' && page.meta?.series
//                     ? `${page.meta.series.slug}/`
//                     : ``
//             }${page.slug}`,
//             lastModified: new Date(page.updatedAt),
//         })),
//         ...series.docs.map((page) => ({
//             url: `https://localvineyard.church/series/${page.slug}`,
//             lastModified: new Date(page.updatedAt),
//         })),
//         ...(events.totalDocs > 0
//             ? events.docs.map((page) => ({
//                 url: `https://localvineyard.church/events/${page.slug}`,
//                 lastModified: new Date(page.updatedAt),
//             }))
//             : []),
//         ...(smallGroupsActive
//             ? allGroups.map(
//                 (page: {
//                     attributes: { name: string | undefined; created_at: string | number | Date }
//                 }) => ({
//                     url: `https://localvineyard.church/small-groups/${_.kebabCase(page.attributes.name)}`,
//                     lastModified: new Date(page.attributes.created_at),
//                 }),
//             )
//             : []),
//     ]
// }
