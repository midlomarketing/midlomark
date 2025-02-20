import {RenderBlocks} from '../../../components/RenderBlocks'
import {addBreadcrumbs, addImage} from '../../../components/Schema'
import {meta as GenerateMetadata} from '@/app/(app)/components/Metadata'
import configPromise from '@payload-config'
import {getPayload} from 'payload'
import {Metadata} from 'next'
import React, {cache} from 'react'
import {draftMode} from 'next/headers'
import {Industry as IndustryType} from '@/payload-types'
import {Redirects} from '../../../components/Redirects'
import {Hero} from "@/app/(app)/components/Hero";
import {Schema} from "@/app/(app)/components/Schema/Container";
import {BreadcrumbProps} from "@/app/(app)/components/Breadcrumbs/Breadcrumbs";


export async function generateStaticParams() {
  const payload = await getPayload({config: configPromise})
  const pages = await payload.find({
    collection: 'pages',
    limit: 1000,
    draft: false,
    overrideAccess: false,
  })

  const params = pages.docs
    ?.filter((doc => {
      return doc.slug !== 'home'
    }))
    .map(({slug}) => {
      return {slug}
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}


export default async function Page({params: paramsPromise}: Args) {
  const {slug = 'industries'} = await paramsPromise
  const url = '/' + slug
  let page: IndustryType


  page = await queryPageBySlug({
    slug,
  })

  if (!page) {
    return <Redirects url={url}/>
  }

  const {hero, content, meta} = page

  const pageLayout = page.content?.content

  const breadcrumbs: BreadcrumbProps = [
    {
        link: '/',
        name: 'home',
      },
      {
        link: '/industries',
        name: 'industries',
      },
      {
        name: page.title || ''
      }
  ]

  const schema = [
    meta?.image && typeof meta?.image !== 'string' && addImage(meta.image),
    addBreadcrumbs(breadcrumbs)
  ]

  return (
    <main>
      <Redirects url={url} disableNotFound/>
      {schema && <Schema schema={schema} />}
      {hero?.image?.image && <Hero
        {...hero}
      />
      }
      {/* @ts-ignore */}
      <RenderBlocks blocks={pageLayout}/>
    </main>
  )
}


export async function generateMetadata({params: paramsPromise}): Promise<Metadata> {

  const {slug = 'industries'} = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  if (page) {
    return GenerateMetadata({doc: page})
  } else {
    return {}
  }
}

const queryPageBySlug = cache(async ({slug}: { slug: string }) => {
  const {isEnabled: draft} = await draftMode()

  const payload = await getPayload({config: configPromise})

  const result = await payload.find({
    collection: 'industries',
    draft,
    limit: 1,
    depth: 1,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
