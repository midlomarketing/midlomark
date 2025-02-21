import type {Post, Page, Industry} from '../payload-types'
import {getPayload} from "payload";
import config from '@payload-config'
import {getServerSideURL} from "@/utilities/getURL";
import type {MetadataRoute} from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const payload = await getPayload({config})

  const url = getServerSideURL()
  const posts = await payload.find({
    collection: 'posts',
    limit: 0,
    where: {},
    select: {
      slug: true,
      updatedAt: true,
    }
  }).then(res => res.docs)
  const industries = await payload.find({
    collection: 'industries',
    limit: 0,
    where: {},
    select: {
      slug: true,
      updatedAt: true,
      meta: true,
    }
  }).then(res => res.docs)
  const pages = await payload.find({
    collection: 'pages',
    limit: 0,
    where: {},
    select: {
      slug: true,
      updatedAt: true,
    }
  }).then(res => res.docs)

  return [
    ...pages.map((page, i) => ({
      url: page.slug === 'home' ? `${url}` : `${url}/${page.slug}`,
      lastModified: page.updatedAt
    })),
    ...posts.map((post, i) => ({
      url: `${url}/posts/${post.slug}`,
      lastModified: post.updatedAt,
    })),
    ...industries.map((industry, i) => ({
      url: industry.meta?.canonical ? `${industry.meta?.canonical}` : `${url}/industries/${industry.slug}`,
      lastModified: industry.updatedAt,
    }))
  ]
}
