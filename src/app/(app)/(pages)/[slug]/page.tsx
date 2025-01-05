import {ShowBlocks} from '../../components/ShowBlocks'
import {addImage} from '../../components/Schema'
import {Key} from 'react'
import {meta as GenerateMetadata} from '@/app/(app)/components/Metadata'
import configPromise from '@payload-config'
import {getPayload} from 'payload'
import {Metadata} from 'next'
import React, {cache} from 'react'
import {draftMode} from 'next/headers'
import {Page as PageType} from '@/payload-types'
import {Redirects} from '../../components/Redirects'
import {Hero} from "@/app/(app)/components/Hero";


// export const revalidate = 86400

// TODO blog navigation (with previous and next) <-- -->
// TODO render blog categories on cards (likely over the image)
// TODO clean up components

// TODO build out industry pages

// TODO work on schema to make sure that works


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

  const imageFilename = typeof meta?.image !== 'string' && meta?.image?.filename

  const schema = [
    await addImage({
      src: imageFilename || '',
      credit: {
        creator: typeof meta?.image !== 'string' && meta?.image?.credit?.creator || '',
        creatorLink: typeof meta?.image !== 'string' && meta?.image?.credit?.creatorLink || '',
        creatorType: typeof meta?.image !== 'string' && meta?.image?.credit?.creator || undefined,
      }
    }),
  ]

  return (
    <main>
      <Redirects url={url} disableNotFound/>
      {schema && <script
        type={`application/ld+json`}
        dangerouslySetInnerHTML={{__html: JSON.stringify(schema.map((s) => s))}}
      />}
      {/*@ts-ignore*/}
      {hero?.image?.image && <Hero
        {...hero}
      />
      }
      {pageBlocks && pageBlocks.map((block: any, k: Key) => (
        <ShowBlocks key={k} blocks={block}/>
      ))}
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
