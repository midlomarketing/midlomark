import {RenderBlocks} from '../../components/RenderBlocks'
import {addImage} from '../../components/Schema'
import {meta as GenerateMetadata} from '@/app/(app)/components/Metadata'
import configPromise from '@payload-config'
import {getPayload} from 'payload'
import {Metadata} from 'next'
import React, {cache} from 'react'
import {draftMode} from 'next/headers'
import {Page as PageType} from '@/payload-types'
import {Redirects} from '../../components/Redirects'
import {Hero} from "@/app/(app)/components/Hero";

// TODO try building and checking for errors, reading internalLink as undefined. just disable buttons?
// TODO search plugin, collection slugs to link out to, finish designing search page
// TODO pagination for blog posts
// TODO work on auth, review website template to see how Payload CMS does auth
// TODO test out plugins that people create

export async function generateStaticParams() {
  const payload = await getPayload({config: configPromise})
  const pages = await payload.find({
    collection: 'pages',
    limit: 1000,
    draft: false,
    overrideAccess: true,
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
  const {slug = 'home'} = await paramsPromise
  const url = '/' + slug
  let page: PageType


  page = await queryPageBySlug({
    slug,
  })

  if (!page) {
    return <Redirects url={url}/>
  }

  const {hero, content, meta} = page

  const pageBlocks = content?.content
  const pageLayout = page.content?.content

  const imageFilename = typeof meta?.image !== 'string' && meta?.image?.filename

  const schema = [
    meta?.image && typeof meta?.image !== 'string' && addImage(meta.image),
  ]

  return (
    <main>
      <Redirects url={url} disableNotFound/>
      {schema && <script
        type={`application/ld+json`}
        dangerouslySetInnerHTML={{__html: JSON.stringify(schema.map((s) => s))}}
      />}
      {hero?.image?.image && <Hero
        {...hero}
      />
      }
      {/* @ts-ignore */}
      <RenderBlocks blocks={pageLayout}/>
    </main>
  )
}

//@ts-ignore
export async function generateMetadata({params: paramsPromise}): Promise<Metadata> {

  const {slug = 'home'} = await paramsPromise
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
    collection: 'pages',
    draft,
    limit: 1,
    depth: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
