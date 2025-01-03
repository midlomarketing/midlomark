// import formatDate from '@/app/(app)/utils/formatDate'
// import {getPayload} from 'payload'
// import configPromise from '@payload-config'
// import {Album, Message, Song, Event, GlobalSetting} from '../../../../../payload-types'
// import {getPayloadHMR} from "@payloadcms/next/utilities";
// import {getCachedGlobal} from "@/app/(app)/utils/getGlobals";
//
// const payload = await getPayloadHMR({config: configPromise})
//
// // const globals = await payload.findGlobal({
// //     slug: 'global-settings',
// // })
//
// type TwoBreadcrumbs = { name1: string; url1: string; name2: string }
// type ThreeBreadcrumbs = {
//     name1: string
//     url1: string
//     name2: string
//     url2?: string
//     name3?: string
// }
type Image = {
    src?: string,
    credit?: CreditType
}

import { CreditType } from "../../utils/types"
import { VideoType} from "../Media/Media/types"

// export const add2Breadcrumbs = async ({name1, url1, name2}: TwoBreadcrumbs) => {
//     const globals: GlobalSetting = await getCachedGlobal('global-settings', 1)()
//
//     return {
//         '@context': 'https://schema.org',
//         '@type': 'BreadcrumbList',
//         itemListElement: [
//             {
//                 '@type': 'ListItem',
//                 position: 1,
//                 name: name1,
//                 item: `${globals.churchDomain}${url1}`,
//             },
//             {
//                 '@type': 'ListItem',
//                 position: 2,
//                 name: name2,
//             },
//         ],
//     }
// }


// export const add3Breadcrumbs = async ({name1, url1, name2, url2, name3}: ThreeBreadcrumbs) => {
//     const globals: GlobalSetting = await getCachedGlobal('global-settings', 1)()
//
//     return {
//         '@context': 'https://schema.org',
//         '@type': 'BreadcrumbList',
//         itemListElement: [
//             {
//                 '@type': 'ListItem',
//                 position: 1,
//                 name: name1,
//                 item: `${globals.churchDomain}${url1}` || ``,
//             },
//             {
//                 '@type': 'ListItem',
//                 position: 2,
//                 name: name2,
//                 item: `${globals.churchDomain}${url2}` || ``,
//             },
//             {
//                 '@type': 'ListItem',
//                 position: 3,
//                 name: name3 || ``,
//             },
//         ],
//     }
// }

export const addImage = async ({ src, credit }: Image) => {

    const imageCredit = {
        '@type': credit && credit.creatorType || 'Organization',
        name: credit && credit.creator || 'MidloMark',
        sameAs: credit && credit.creatorLink || 'https://midlomark.com'
    }

    return {
        '@context': 'https://schema.org/',
        '@type': 'ImageObject',
        contentUrl: src,
        creator: imageCredit,
    }
}

// export const addEvent = async (event: Event) => {
//     const globals: GlobalSetting = await getCachedGlobal('global-settings', 1)()
//
//     return {
//         '@context': 'https://schema.org',
//         '@type': 'Event',
//         name: event.name,
//         startDate: event.startDate || ``,
//         endDate: event.endDate || ``,
//         duration: event.duration
//             ? `PT${event.duration?.split(':')[0]}H${event.duration?.split(':')[1]}M`
//             : null,
//         eventAttendanceMode:
//             event.attendanceType === 'In Person'
//                 ? 'OfflineEventAttendanceMode'
//                 : event.attendanceType === 'Online'
//                     ? 'OfflineEventAttendanceMode'
//                     : 'MixedAttendanceMode',
//         eventSchedule: event.repeats
//             ? {
//                 '@type': 'Schedule',
//                 startDate: event.startDate || ``,
//                 endDate: event.endDate || null,
//                 repeatFrequency:
//                     event.repeatFrequency === 'daily'
//                         ? 'P1D'
//                         : event.repeatFrequency === 'weekly'
//                             ? 'P1W'
//                             : 'P1M',
//                 byDay: new Date(event.startDate || ``).toLocaleDateString('en-US', {weekday: 'long'}),
//                 startTime: new Date(event.startDate || ``).toLocaleDateString('en-US', {
//                     hour: '2-digit',
//                     minute: '2-digit',
//                     dayPeriod: 'short',
//                 }),
//                 endTime: new Date(event.endDate || ``).toLocaleDateString('en-US', {
//                     hour: '2-digit',
//                     minute: '2-digit',
//                     dayPeriod: 'short',
//                 }),
//                 scheduleTimezone: new Date(event.endDate || ``).toLocaleDateString('en-US', {
//                     timeZoneName: 'long',
//                 }),
//             }
//             : null,
//         eventStatus: event.eventStatus,
//         location: {
//             '@type': 'Place',
//             name: event.locationInformation?.location,
//             address: {
//                 '@type': 'PostalAddress',
//                 streetAddress: event.locationInformation?.streetAddress,
//                 addressLocality: event.locationInformation?.city,
//                 postalCode: event.locationInformation?.zipCode,
//                 addressRegion: event.locationInformation?.state,
//                 addressCountry: event.locationInformation?.country,
//             },
//         },
//         offers:
//             event.cost?.map((price) => ({
//                 '@type': 'Offer',
//                 url: `${globals.churchDomain}/events/${event.slug}`,
//                 price: price ? `${price.price}` : '0',
//                 priceCurrency: 'USD',
//                 availability: price.availability,
//             })) || null,
//         image: {
//             '@type': 'ImageObject',
//             url:
//                 typeof event.featuredImage?.image !== 'string' &&
//                 `${process.env.CLOUDFLARE_BUCKET}/${event.featuredImage?.image?.filename}`,
//         },
//         description: event.description_html,
//         organizer: {
//             '@type': 'Church',
//             name: globals.churchName,
//             url: `${globals.churchDomain}/`,
//         },
//         about: event.seo?.seoAbout?.map((about) => ({
//             '@type': typeof about !== 'string' && about.type,
//             name: typeof about !== 'string' && about.name,
//             sameAs: typeof about !== 'string' && about.sameAs?.map(link => link.source),
//         })),
//     }
// }

// // TODO don't think this is doable through API alone without significant workarounds
// // export const addSmallGroupSchedule = ({ groupName }) => ({
// //   '@context': 'https://schema.org',
// //   '@type': 'Event',
// //   name: groupName,
// //   eventSchedule: {
// //     '@type': 'Schedule',
// //     repeatFrequency: 'weekly', // TODO would ideally be able to put this in from the API
// //     startDate: '2020-01-26',
// //     byDay: 'Sunday',
// //     startTime: '10:30:00',
// //     endTime: '11:35:00',
// //   },
// // })
// // TODO: https://schema.org/eventSchedule example 1
// // relies on https://api.planningcenteronline.com/groups/v2/events and a schedule being made

// // TODO: come back to this when adding multiple services
// export const addWeeklyServiceSchedule = async () => {
//     const globals: GlobalSetting = await getCachedGlobal('global-settings', 1)()
//
//     const meetingAddress = globals.footerAddresses?.addresses?.filter(
//         (a) => typeof a.address !== 'string' && a.address?.meetingAddress,
//     )
//
//     const streetAddress =
//         meetingAddress &&
//         typeof meetingAddress[0].address !== 'string' &&
//         meetingAddress[0].address?.streetAddress
//     const city =
//         meetingAddress && typeof meetingAddress[0].address !== 'string' && meetingAddress[0].address?.city
//     const state =
//         meetingAddress &&
//         typeof meetingAddress[0].address !== 'string' &&
//         meetingAddress[0].address?.state
//     const zip =
//         meetingAddress && typeof meetingAddress[0].address !== 'string' && meetingAddress[0].address?.zip
//
//     return {
//         '@context': 'https://schema.org',
//         '@type': 'Event',
//         name: 'Sunday Service at Local Vineyard Church',
//         startDate: '2020-01-26',
//         eventSchedule: {
//             '@type': 'Schedule',
//             repeatFrequency: 'weekly',
//             startDate: '2020-01-26',
//             byDay: 'Sunday',
//             startTime: '10:30:00',
//             endTime: '11:35:00',
//         },
//         location: {
//             '@type': 'Place',
//             name: globals.churchName,
//             address: {
//                 '@type': 'PostalAddress',
//                 streetAddress: streetAddress,
//                 addressLocality: city,
//                 addressRegion: state,
//                 postalCode: zip,
//                 addressCountry: 'US',
//             },
//         },
//     }
// }

export const addVideo = async (video: VideoType) => {

    return {
        '@context':
            'https://schema.org',
        '@type':
            'VideoObject',
        name:
            `${video.videoName} | ${video.creatorName} | ${`MidloMark`
            }`,
        description:
            video.description_html,
        thumbnailUrl:
            `${process.env.CLOUDFLARE_BUCKET}/${video.image?.image?.filename}`,
        uploadDate:
            // formatDate(
            video.uploadDate || ``,
        // ),
        duration:
            `PT${video.minutes}M${video.seconds}S`,
        embedUrl:
            `https://www.youtube.com/embed/${video.video.split('https://youtu.be/')[1]}`,
    }
}

// export const addLogo = async () => {
//     const globals: GlobalSetting = await getCachedGlobal('global-settings', 1)()
//
// TODO use this as a way to filter by "Primary Address" or similar
//     const meetingAddress = globals.footerAddresses?.addresses?.filter(
//         (a) => typeof a.address !== 'string' && a.address?.meetingAddress,
//     )
//
//     const streetAddress =
//         meetingAddress &&
//         typeof meetingAddress[0].address !== 'string' &&
//         meetingAddress[0].address?.streetAddress
//     const city =
//         meetingAddress && typeof meetingAddress[0].address !== 'string' && meetingAddress[0].address?.city
//     const state =
//         meetingAddress &&
//         typeof meetingAddress[0].address !== 'string' &&
//         meetingAddress[0].address?.state
//     const zip =
//         meetingAddress && typeof meetingAddress[0].address !== 'string' && meetingAddress[0].address?.zip
//
//     const phone = globals.phone?.phoneNumber
//     return {
//         '@context': 'https://schema.org',
//         '@type': 'Organization',
//         url: globals.churchDomain,
//         logo: {
//             '@type': 'ImageObject',
//             contentUrl: `${process.env.CLOUDFLARE_BUCKET}/logo-icon.webp`,
//         },
//         sameAs: globals.socialLinks?.map((link) => link.fullLink),
//         name: globals.churchName,
//         description: 'Helping everyday people learn how to become Jesus followers.',
//         address: {
//             '@type': 'PostalAddress',
//             streetAddress: streetAddress,
//             addressLocality: city,
//             addressRegion: state,
//             postalCode: zip,
//             addressCountry: 'US',
//         },
//         contactPoint: {
//             '@type': 'ContactPoint',
//             email: 'info@localvineyard.church',
//             telephone: phone,
//         },
//     }
// }
//
// export const addArticle = (message: Message) => ({
//     '@context': 'https://schema.org',
//     '@type': 'Article',
//     headline: message.name,
//     image: `${process.env.CLOUDFLARE_BUCKET}/${
//         typeof message.featuredImage?.image !== 'string' && message.featuredImage?.image?.filename
//     }`,
//     datePublished: message.date,
//     author: message.meta?.speaker?.map((speaker) => ({
//         '@type': 'Person',
//         name: typeof speaker !== 'string' && speaker.name,
//         sameAs:
//             typeof speaker !== 'string' && speaker.socialLinks?.map((socialLink) => socialLink.fullLink),
//     })),
//     mentions: message.seo?.seoMentions?.map((mention) => ({
//         '@type': typeof mention !== 'string' && mention.type,
//         name: typeof mention !== 'string' && mention.name,
//         sameAs: typeof mention !== 'string' && mention.sameAs?.map(link => link.source),
//     })),
//     about: message.seo?.seoAbout?.map((about) => ({
//         '@type': typeof about !== 'string' && about.type,
//         name: typeof about !== 'string' && about.name,
//         sameAs: typeof about !== 'string' && about.sameAs?.map(link => link.source),
//     })),
//     isPartOf: {
//         '@type': 'CreativeWorkSeries',
//         name: typeof message.meta?.series !== 'string' && message.meta?.series?.name,
//     },
//     articleBody: message.description_html,
// })
//
// export const addPodcastEpisode = async (message: Message) => {
//     const globals: GlobalSetting = await getCachedGlobal('global-settings', 1)()
//     return {
//         '@context': 'https://schema.org',
//         '@type': 'PodcastEpisode',
//         url: message?.meta?.series
//             ? `${globals.churchDomain}/messages/${
//                 typeof message.meta.series !== 'string' && message.meta.series.slug
//             }/${message.slug}`
//             : `${globals.churchDomain}/messages/${message.slug}`,
//         name: message.name,
//         datePublished: message.date,
//         timeRequired: `PT${message.sidebar?.length?.split(':')[0]}M${
//             message.sidebar?.length?.split(':')[1]
//         }S`,
//         description: message.summary,
//         associatedMedia: {
//             '@type': 'MediaObject',
//             contentUrl: message.mediaMeta?.audioLink,
//         },
//         partOfSeries: {
//             '@type': 'CreativeWorkSeries',
//             name:
//                 message.meta?.series &&
//                 typeof message.meta?.series !== 'string' &&
//                 message.meta?.series?.name,
//             url:
//                 message.meta?.series &&
//                 `${globals.churchDomain}/series/${
//                     typeof message.meta?.series !== 'string' && message.meta?.series?.slug
//                 }`,
//         },
//         actor: message.meta?.speaker?.map((speaker) => ({
//             '@type': 'Person',
//             name: typeof speaker !== 'string' && speaker.name,
//             sameAs:
//                 typeof speaker !== 'string' && speaker.socialLinks?.map((socialLink) => socialLink.fullLink),
//         })),
//         mentions: message.seo?.seoMentions?.map((mention) => ({
//             '@type': typeof mention !== 'string' && mention.type,
//             name: typeof mention !== 'string' && mention.name,
//             sameAs: typeof mention !== 'string' && mention.sameAs?.map(link => link.source),
//         })),
//         about: message.seo?.seoAbout?.map((about) => ({
//             '@type': typeof about !== 'string' && about.type,
//             name: typeof about !== 'string' && about.name,
//             sameAs: typeof about !== 'string' && about.sameAs?.map(link => link.source),
//         })),
//         thumbnail: {
//             '@type': 'ImageObject',
//             caption:
//                 typeof message.featuredImage?.image !== 'string' && message.featuredImage?.image?.title,
//             contentSize:
//                 typeof message.featuredImage?.image !== 'string' && message.featuredImage?.image?.filesize,
//             height:
//                 typeof message.featuredImage?.image !== 'string' && message.featuredImage?.image?.height,
//             width: typeof message.featuredImage?.image !== 'string' && message.featuredImage?.image?.width,
//             uploadDate:
//                 typeof message.featuredImage?.image !== 'string' && message.featuredImage?.image?.createdAt,
//             contentUrl:
//                 typeof message.featuredImage?.image !== 'string' &&
//                 `${process.env.CLOUDFLARE_BUCKET}/${message.featuredImage?.image?.filename}`,
//             creator: {'@type': 'Church', name: globals.churchName},
//         },
//         image:
//             typeof message.featuredImage?.image !== 'string' &&
//             `${process.env.CLOUDFLARE_BUCKET}/${message.featuredImage?.image?.filename}`,
//         creator: {'@type': 'Church', name: globals.churchName},
//         producer: {'@type': 'Church', name: globals.churchName},
//         provider: {'@type': 'Church', name: globals.churchName},
//         publisher: {'@type': 'Church', name: globals.churchName},
//         isPartOf: {
//             '@type': 'CreativeWorkSeries',
//             name: typeof message.meta?.series !== 'string' && message.meta?.series?.name,
//         },
//     }
// }
//
// export const addSeries = async ({
//                                     startDate,
//                                     endDate,
//                                     messages,
//                                     imageCaption,
//                                     imageUrl,
//                                     imageSize,
//                                     imageHeight,
//                                     imageWidth,
//                                     imageUploadDate,
//                                     mentions,
//                                     about,
//                                 }: any) => {
//     const globals: GlobalSetting = await getCachedGlobal('global-settings', 1)()
//     return {
//         '@context': 'https://schema.org',
//         '@type': 'CreativeWorkSeries',
//         startDate: startDate,
//         endDate: endDate,
//         hasPart: messages.map((message: Message, k: number) => ({
//             '@type': 'CreativeWork',
//             about: message.seo?.seoAbout?.map((about) => ({
//                 '@type': typeof about !== 'string' && about.type,
//                 name: typeof about !== 'string' && about.name,
//                 sameAs: typeof about !== 'string' && about.sameAs?.map(link => link.source),
//             })),
//             author:
//                 message.meta?.speaker?.map((speaker) => ({
//                     '@type': 'Person',
//                     name: typeof speaker !== 'string' && speaker.name,
//                     sameAs: typeof speaker !== 'string' && speaker.socialLinks?.map((link) => link.fullLink),
//                 })) || message.meta?.speaker,
//             datePublished: message.date,
//             headline: message.name,
//             mentions: message.seo?.seoAbout?.map((mention) => ({
//                 '@type': typeof mention !== 'string' && mention.type,
//                 name: typeof mention !== 'string' && mention.name,
//                 sameAs: typeof mention !== 'string' && mention.sameAs?.map(link => link.source),
//             })),
//             position: k + 1,
//             creator: {'@type': 'Church', name: globals.churchName},
//             producer: {'@type': 'Church', name: globals.churchName},
//             provider: {'@type': 'Church', name: globals.churchName},
//             publisher: {'@type': 'Church', name: globals.churchName},
//             sourceOrganization: {'@type': 'Organization', name: globals.churchName},
//             video: {
//                 '@type': 'VideoObject',
//                 name: `${message.name} | ${message.meta?.speaker
//                     ?.map((speaker) => typeof speaker !== 'string' && speaker.name)
//                     .join(', ')} | ${globals.churchName}`,
//                 description: message.summary,
//                 uploadDate: formatDate(message.date || ``),
//                 duration: `PT${message.sidebar?.length?.split(':')[0]}M${
//                     message.sidebar?.length?.split(':')[1]
//                 }S`,
//                 embedUrl: `https://www.youtube.com/embed/${
//                     message.mediaMeta?.youtubeEmbed?.includes('https://youtu.be/')
//                         ? message.mediaMeta?.youtubeEmbed?.split('https://youtu.be/')[1]
//                         : message.mediaMeta?.youtubeEmbed || ``
//                 }`,
//                 thumbnailUrl:
//                     typeof message.featuredImage?.image !== 'string' &&
//                     `${process.env.CLOUDFLARE_BUCKET}/${message.featuredImage?.image?.filename}`,
//             },
//         })),
//         creator: {'@type': 'Church', name: globals.churchName},
//         producer: {'@type': 'Church', name: globals.churchName},
//         provider: {'@type': 'Church', name: globals.churchName},
//         publisher: {'@type': 'Church', name: globals.churchName},
//         thumbnail: {
//             '@type': 'ImageObject',
//             caption: imageCaption,
//             contentUrl: imageUrl,
//             contentSize: imageSize,
//             height: imageHeight,
//             width: imageWidth,
//             uploadDate: imageUploadDate,
//             creator: {'@type': 'Church', name: globals.churchName},
//         },
//         thumbnailUrl: imageUrl,
//         mentions: mentions,
//         about: about,
//     }
// }
//
// export const addSong = (song: Song) => {
//     return {
//         '@context': 'https://schema.org',
//         '@type': 'MusicRecording',
//         byArtist: {
//             '@type': 'MusicGroup',
//             name: 'Local Vineyard Worship',
//             sameAs: 'https://lvcworship.com',
//         },
//         name: song.name,
//         image:
//             typeof song.featuredImage?.image !== 'string' &&
//             `${process.env.CLOUDFLARE_BUCKET}/${song.featuredImage?.image?.filename}`,
//         duration: `PT${song.sidebar?.length?.split(':')[0]}M${song.sidebar?.length?.split(':')[1]}S`,
//         inAlbum: {
//             '@type': 'MusicAlbum',
//             name: typeof song.meta?.album !== 'string' && song.meta?.album?.name,
//             about:
//                 typeof song.meta?.album !== 'string' &&
//                 song.meta?.album?.seo?.seoAbout?.map((about) => ({
//                     '@type': typeof about !== 'string' && about.type,
//                     name: typeof about !== 'string' && about.name,
//                     sameAs: typeof about !== 'string' && about.sameAs?.map(link => link.source),
//                 })),
//             mentions:
//                 typeof song.meta?.album !== 'string' &&
//                 song.meta?.album?.seo?.seoAbout?.map((mention) => ({
//                     '@type': typeof mention !== 'string' && mention.type,
//                     name: typeof mention !== 'string' && mention.name,
//                     sameAs: typeof mention !== 'string' && mention.sameAs?.map(link => link.source),
//                 })),
//         },
//         producer: song.meta?.producedBy?.map((person) => ({
//             '@type': 'Person',
//             name: typeof person !== 'string' && person.name,
//             sameAs: typeof person !== 'string' && person.socialLinks?.map((link) => link.fullLink),
//         })),
//         author: song.meta?.writtenBy?.map((person) => ({
//             '@type': 'Person',
//             name: typeof person !== 'string' && person.name,
//             sameAs: typeof person !== 'string' && person.socialLinks?.map((link) => link.fullLink),
//         })),
//         about: song.seo?.seoAbout?.map((about) => ({
//             '@type': typeof about !== 'string' && about.type,
//             name: typeof about !== 'string' && about.name,
//             sameAs: typeof about !== 'string' && about.sameAs?.map(link => link.source),
//         })),
//         mentions: song.seo?.seoAbout?.map((mention) => ({
//             '@type': typeof mention !== 'string' && mention.type,
//             name: typeof mention !== 'string' && mention.name,
//             sameAs: typeof mention !== 'string' && mention.sameAs?.map(link => link.source),
//         })),
//         text: song.lyrics_html,
//     }
// }
//
// export const addAlbum = ({album}: { album: Album }) => ({
//     '@context': 'https://schema.org',
//     '@type': 'MusicAlbum',
//     albumProductionType: 'https://schema.org/StudioAlbum',
//     genre: 'worship',
//     name: album.name,
//     image: `${process.env.CLOUDFLARE_BUCKET}/${
//         typeof album.featuredImage?.image !== 'string' && album.featuredImage?.image?.filename
//     }`,
//     track: {
//         '@type': 'ItemList',
//         numberOfItems: album.songs?.length,
//         itemListElement: album.songs?.map((song, k: number) => ({
//             '@type': 'ListItem',
//             position: k + 1,
//             item: {
//                 '@type': 'MusicRecording',
//                 name: typeof song !== 'string' && song.name,
//                 about:
//                     typeof song !== 'string' &&
//                     song.seo?.seoAbout?.map((about) => ({
//                         '@type': typeof about !== 'string' && about.type,
//                         name: typeof about !== 'string' && about.name,
//                         sameAs: typeof about !== 'string' && about.sameAs?.map(link => link.source),
//                     })),
//                 mentions:
//                     typeof song !== 'string' &&
//                     song.seo?.seoAbout?.map((mention) => ({
//                         '@type': typeof mention !== 'string' && mention.type,
//                         name: typeof mention !== 'string' && mention.name,
//                         sameAs: typeof mention !== 'string' && mention.sameAs?.map(link => link.source),
//                     })),
//                 text: typeof song !== 'string' && song.lyrics_html,
//                 producer:
//                     typeof song !== 'string' &&
//                     song.meta?.producedBy?.map((person) => ({
//                         '@type': 'Person',
//                         name: typeof person !== 'string' && person.name,
//                         sameAs: typeof person !== 'string' && person.socialLinks?.map((link) => link.fullLink),
//                     })),
//                 author:
//                     typeof song !== 'string' &&
//                     song.meta?.writtenBy?.map((person) => ({
//                         '@type': 'Person',
//                         name: typeof person !== 'string' && person.name,
//                         sameAs: typeof person !== 'string' && person.socialLinks?.map((link) => link.fullLink),
//                     })),
//             },
//         })),
//     },
//     byArtist: {
//         '@type': 'MusicGroup',
//         name: 'Local Vineyard Worship',
//         sameAs: 'https://lvcworship.com',
//     },
//     about: album.seo?.seoAbout?.map((about) => ({
//         '@type': typeof about !== 'string' && about.type,
//         name: typeof about !== 'string' && about.name,
//         sameAs: typeof about !== 'string' && about.sameAs?.map(link => link.source),
//     })),
//     mentions: album.seo?.seoAbout?.map((mention) => ({
//         '@type': typeof mention !== 'string' && mention.type,
//         name: typeof mention !== 'string' && mention.name,
//         sameAs: typeof mention !== 'string' && mention.sameAs?.map(link => link.source),
//     })),
// })
