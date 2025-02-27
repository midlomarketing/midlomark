import {getPayload} from 'payload'
import configPromise from '@payload-config'
import {Media, Post, User, VideoProps, GlobalSetting, Address} from "@/payload-types";
import {lexicalToPlainText} from "@/utilities/lexicalToPlainText";
import {getServerSideURL} from "@/utilities/getURL";

import {getCachedGlobal} from "@/app/(app)/utils/getGlobals";


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
      author.socialLinks?.map((socialLink) => socialLink.fullLink),
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

type Props = GlobalSetting

export const addLogo = async (props: Props) => {

    const { streetAddress, city, state, zip } = props.footerAddresses?.addresses?.[0] as Address

    const phone = props.phone?.phoneNumber
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        url: getServerSideURL(),
        logo: {
            '@type': 'ImageObject',
            contentUrl: `${process.env.CLOUDFLARE_BUCKET}/${
              props.logos?.landscapeLogo
              && typeof props.logos.landscapeLogo !== 'string'
              && props.logos?.landscapeLogo.filename
            }`,
        },
        sameAs: props.socialLinks?.map((link) => link.fullLink),
        name: props.businessName,
        description: 'This is a boilerplate NextJS and Payload CMS project',
        address: {
            '@type': 'PostalAddress',
            streetAddress: streetAddress,
            addressLocality: city,
            addressRegion: state,
            postalCode: zip,
            addressCountry: 'US',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'nick@midlowebdesign.com',
            telephone: phone,
        },
    }
}

