// import { FeedSegment } from './FeedSegment'
// import Link from 'next/link'
// import classes from '../Feed/FeedSegment/index.module.scss'
// import {
//   EventCard,
//   MessageCard,
//   SeriesCard,
//   SongCard,
// } from '../../components/Card/MediaCardSection/MediaCard'
// import { getPayload } from 'payload'
// import configPromise from '@payload-config'
// import { Feeds } from '@/app/(app)/blocks/Feed/FeedToAdd.types'
// import {getPayloadHMR} from "@payloadcms/next/utilities";
//
// const payload = await getPayloadHMR({ config: configPromise })
//
// const query = {
//   date: {
//     less_than_equal: new Date(),
//   },
// }
//
// const messageQuery = {
//   date: {
//     less_than_equal: new Date(),
//   },
// }
//
// const seriesQuery = {
//   date: {
//     less_than_equal: new Date(),
//   },
//   status: {
//     not_equals: 'Draft',
//   },
// }
//
// const activeQuery = {
//   endDate: {
//     greater_than_equal: new Date(),
//   },
//   'sidebar.status': {
//     not_equals: 'Draft',
//   },
// }
//
// export default async function FeedToAdd({
//   feedToAdd,
//   className,
// }: {
//   feedToAdd: Feeds
//   className?: string
// }) {
//   if (feedToAdd.toLowerCase() === 'series') {
//     const series = await payload.find({
//       collection: 'series',
//       where: seriesQuery,
//       sort: '-date',
//       limit: 6,
//       depth: 2,
//     })
//
//     return (
//       <section className={`mWidth`}>
//         <div className={`${classes.titleSection}`}>
//           <h2 className={`text-highlight`}>RECENT SERIES</h2>
//           {series.totalDocs > 6 && (
//             <Link
//               title={`Navigate to all series`}
//               className={classes.link}
//               href={`/series`}
//               aria-label={`Navigate to all series`}
//             >
//               SEE ALL
//             </Link>
//           )}
//         </div>
//         <FeedSegment>
//           {series?.docs?.map((doc, k) => (
//             <SeriesCard key={k} series={doc} includeCategories={false} />
//           ))}
//         </FeedSegment>
//       </section>
//     )
//   } else if (feedToAdd.toLowerCase() === 'songs') {
//     const songs = await payload.find({
//       collection: 'songs',
//       where: query,
//       limit: 6,
//       sort: '-date',
//       depth: 2,
//     })
//
//     return (
//       <section className={`mWidth`}>
//         <div className={`${classes.titleSection}`}>
//           <h2 className={`text-highlight`}>RECENT SONGS</h2>
//           {songs.totalDocs > 6 && (
//             <Link
//               className={classes.link}
//               href={`https://lvcworship.com/songs?utm_source=localvineyard.church&utm_medium=referral&utm_campaign=media_feed`}
//               aria-label={`Navigate to all songs`}
//               title={`Navigate to all songs`}
//             >
//               SEE ALL
//             </Link>
//           )}
//         </div>
//         <FeedSegment>
//           {songs?.docs?.map((doc, k) => (
//             <SongCard key={k} song={doc} includeCategories={false} />
//           ))}
//         </FeedSegment>
//       </section>
//     )
//   } else if (feedToAdd.toLowerCase() === 'podcasts') {
//     return <section>{/*TODO add podcasts?*/}</section>
//   } else if (feedToAdd.toLowerCase() === 'sermon') {
//     const messages = await payload.find({
//       collection: 'messages',
//       where: messageQuery,
//       sort: '-date',
//       limit: 6,
//       depth: 1,
//     })
//
//     return (
//       <section className={`mWidth`}>
//         <div className={`${classes.titleSection}`}>
//           <h2 className={`text-highlight`}>RECENT MESSAGES</h2>
//           {messages.totalDocs > 6 && (
//             <Link
//               title={`Navigate to all messages`}
//               className={classes.link}
//               href={`/messages`}
//               aria-label={`Navigate to all messages`}
//             >
//               SEE ALL
//             </Link>
//           )}
//         </div>
//         <FeedSegment>
//           {messages?.docs?.map((doc, k) => (
//             <MessageCard key={k} message={doc} includeCategories={false} />
//           ))}
//         </FeedSegment>
//       </section>
//     )
//   } else if (feedToAdd.toLowerCase() === 'event') {
//     const events = await payload.find({
//       collection: 'events',
//       where: activeQuery,
//       limit: 6,
//       sort: '-featuredEvent',
//       // depth: 2,
//     })
//
//     return (
//       events.totalDocs > 0 && (
//         <section className={`mWidth`}>
//           <div className={`${classes.titleSection} ${className}`}>
//             <h2 className={`text-highlight`}>UPCOMING EVENTS</h2>
//             {events.totalDocs > 6 && (
//               <Link
//                 className={classes.link}
//                 href={`/events`}
//                 aria-label={`Navigate to all events`}
//                 title={`Navigate to all events`}
//               >
//                 SEE ALL
//               </Link>
//             )}
//           </div>
//           <FeedSegment>
//             {events?.docs?.map((doc) => (
//               <EventCard key={doc.id} event={doc} />
//             ))}
//           </FeedSegment>
//         </section>
//       )
//     )
//   }
// }
