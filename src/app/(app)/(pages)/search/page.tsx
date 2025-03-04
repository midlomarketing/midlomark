import type {Metadata} from 'next/types'
import configPromise from '@payload-config'
import {getPayload} from 'payload'
import React, {Fragment} from 'react'
import {Search} from '@/search/Component'
import classes from './index.module.scss'
import {ImageObject} from "@/app/(app)/components/Media/Media";
import Grid from "@/app/(app)/components/PageLayout/Grid";
import {ContentContainer, SectionContainer} from "@/app/(app)/components/PageLayout";
import Link from "next/link";

type Args = {
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({searchParams: searchParamsPromise}: Args) {
  const {q: query} = await searchParamsPromise
  const payload = await getPayload({config: configPromise})

  const posts = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      updatedAt: true,
      createdAt: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
        where: {
          or: [
            {
              title: {
                like: query,
              },
            },
            {
              'meta.description': {
                like: query,
              },
            },
            {
              'meta.title': {
                like: query,
              },
            },
            {
              slug: {
                like: query,
              },
            },
          ],
        },
      }
      : {}),
  })

  console.log(posts.docs[0])

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">Search</h1>

          <div className="max-w-[50rem] mx-auto">
            <Search/>
          </div>
        </div>
      </div>

      {posts?.docs && posts.totalDocs > 0 ? (<SectionContainer><ContentContainer><Grid>
        {posts.docs.map(post => (
          post?.meta?.image && typeof post.meta.image &&
          <Fragment key={post.id}>
            <Link className={classes.div} href={`/${post.slug}`}>
              {post?.meta?.image && typeof post.meta?.image !== 'string' &&
                <ImageObject {...post.meta.image} className={classes.image}/>}
                <p className={classes.title}>{post.title}</p>
            </Link>
          </Fragment>
        ))}
      </Grid></ContentContainer></SectionContainer>) : (
        <div className="container">No results found.</div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Search`,
  }
}
