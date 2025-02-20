import {getPayload} from 'payload'
import configPromise from '@payload-config'
import {Media, Post, User, VideoProps} from "@/payload-types";
import {lexicalToPlainText} from "@/utilities/lexicalToPlainText";
import {getServerSideURL} from "@/utilities/getURL";

// import {getCachedGlobal} from "@/app/(app)/utils/getGlobals";
//
// const payload = await getPayloadHMR({config: configPromise})
//
// const globals = await payload.findGlobal({
//     slug: 'global-settings',
// })

export const addArticle = (post: Post) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  image: `${process.env.CLOUDFLARE_BUCKET}/${
    post.content?.image?.image && typeof post.content.image.image !== 'string' && post.content.image.image.filename
  }`,
  datePublished: post.date,
  dateModified: post.updatedAt,
  author: post.content?.authors?.map((author: User) => ({
    '@type': 'Person',
    name: author.name,
    sameAs:
      author.socialLinks?.map((socialLink) => socialLink.channel),
  })),
  articleBody: lexicalToPlainText(post.content?.richText),
})


type BreadcrumbProps = {
  link?: string
  name: string
}[]

export const addBreadcrumbs = (breadcrumbs: BreadcrumbProps) => {

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index, arr) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.link && `${getServerSideURL()}${breadcrumb?.link}`,

    }))
  }
}

export const addImage = (image: Media) => {

  const imageCredit = {
    '@type': image?.credit?.creatorType || 'Organization',
    name: image?.credit?.creator || 'MidloMark',
    sameAs: image?.credit?.creatorLink || 'https://midlomark.com'
  }

  return {
    '@context': 'https://schema.org/',
    '@type': 'ImageObject',
    contentUrl: `${process.env.CLOUDFLARE_BUCKET}/${image.filename}`,
    creator: imageCredit,
  }
}

export const addVideo = async (props: VideoProps) => {

  const {
    video,
    videoName,
    creatorName,
    description,
    image,
    uploadDate,
    minutes,
    seconds
  } = props


  return {
    '@context':
      'https://schema.org',
    '@type':
      'VideoObject',
    name:
      `${videoName} | ${creatorName} | MidloMark`,
    description:
      lexicalToPlainText(description),
    thumbnailUrl:
      `${process.env.CLOUDFLARE_BUCKET}/${image?.image && typeof image.image !== 'string' && image.image.filename}`,
    uploadDate:
      uploadDate || ``,
    duration:
      `PT${minutes}M${seconds}S`,
    embedUrl:
      `https://www.youtube.com/embed/${video?.split('https://youtu.be/')[1]}`,
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
