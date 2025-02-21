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

// TODO get Admin UI favicons set
// TODO add social section component (pull in svg icon for the section, put in footer)
// TODO work on lexicalToPlainText.ts to try and plain-text-ify blocks
// TODO create local business schema from addLogo

// TODO try nested blocks
//// TODO a section block with a background-color field with blocks inside that would be 'text and media' - is this just using RenderBlocks inside the Block?

// TODO search plugin
// TODO include BG boolean selection and color picker in block

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
    meta?.image && typeof meta?.image !== 'string' && await addImage(meta.image),
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
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
