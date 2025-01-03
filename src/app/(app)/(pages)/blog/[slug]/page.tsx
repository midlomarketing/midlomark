import classes from './page.module.scss'
import Link from 'next/link'
import {Metadata} from 'next'
import {meta} from '@/app/(app)/components/Metadata'
import {getPayload, Where} from 'payload'
import configPromise from '@payload-config'
import {GeneralDate} from '@/app/(app)/components/Date'
import {SerializeLexical} from '@/app/(app)/components/RichText/Lexical'
import formatDate from '@/app/(app)/utils/formatDate'
import React, {cache} from "react";
import {draftMode} from "next/headers";
import {GlobalSetting} from "@/payload-types";
import {getCachedGlobal} from "@/app/(app)/utils/getGlobals";
import {Redirects} from "@/app/(app)/components/Redirects";
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {ImageObject} from "@/app/(app)/components/Media/Media";
import {ToTopButton} from "@/app/(app)/components/ToTopButton";
import {BreadCrumbsContainer, Breadcrumbs} from "@/app/(app)/components/Breadcrumbs";

type Props = {
   params: Promise<{ slug: string }>

}

export async function generateStaticParams() {
  const payload = await getPayload({config: configPromise})
  const blogs = await payload.find({
    collection: 'posts',
    limit: 1000,
    draft: false,
    overrideAccess: false,
  })

  const params = blogs.docs
    .map(({slug}) => {
      return {slug}
    })

  return params
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const slug = (await params).slug
  const blogQuery = {
    slug: {
      equals: slug
    },
    date: {
      less_than_equal: new Date(),
    }
  }
  const response = await queryBlog({slug: blogQuery})
  const blog = response.docs[0]

  if (blog) {
    return meta({doc: blog})
  } else {
    return {
      title: '404'
    }
  }
}

export default async function Blog({params}: Props) {
  const slug = (await params).slug
  const blogQuery = {
    slug: {
      equals: slug
    },
    date: {
      less_than_equal: new Date(),
    }
  }
  const response = await queryBlog({slug: blogQuery})
  const blog = response.docs[0]

  if (blog) {
    const url = '/' + slug
    const {content, meta} = blog

    const breadcrumbs = [
      {
        link: '/',
        name: 'home',
      },
      {
        link: '/blog',
        name: 'blog',
      },
      {
        name: blog.title
      }
    ]

    return <article>
      <Redirects url={url} disableNotFound/>
      <SectionContainer>
        <div className={classes.blogContainer}>
          {/* sidebar */}
          <aside className={classes.sidebarContainer}>
            <div className={classes.sidebar}>
              <BreadCrumbsContainer>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
              </BreadCrumbsContainer>
              <h1 className={classes.blogTitle}>{blog.title}</h1>
              <div className={classes.blogInfo}>
                <div className={classes.blogAuthors}>{content?.authors?.map((author, index) => (
                  <Link key={index} className={classes.blogAuthorLink}
                        href={typeof author !== 'string' && `/authors/${author.slug}` || ``}>{typeof author !== 'string' && author.name} |
                    Posts: {typeof author !== 'string' && author.postCount}</Link>
                ))}</div>
                <GeneralDate className={classes.blogDate} date={blog.date || ``} includeTime={false}/></div>
              {/* categories */}
              {content?.summary && <div className={classes.summary}>
                <h2 className={classes.summaryHeader}>Summary</h2>
                <p>{content.summary}</p>
              </div>}</div>
          </aside>
          <main className={classes.main}>
            <ImageObject
              className={classes.blogImage}
              filename={typeof content?.image?.image !== 'string' && content?.image?.image?.filename || ''}
              width={typeof content?.image?.image !== 'string' && content?.image?.image?.width || 640}
              height={typeof content?.image?.image !== 'string' && content?.image?.image?.height || 360}
              altDescription={typeof content?.image?.image !== 'string' && content?.image?.image?.altDescription || ''}
              creator={typeof content?.image?.image !== 'string' && content?.image?.image?.credit?.creator || ''}
              creatorLink={typeof content?.image?.image !== 'string' && content?.image?.image?.credit?.creatorLink || ''}
              creatorType={typeof content?.image?.image !== 'string' && content?.image?.image?.credit?.creatorLink || ''}
            />
            <SerializeLexical className={classes.blogContent} nodes={content?.richText?.root.children}/>
          </main>
        </div>
        <ToTopButton />
      </SectionContainer>

    </article>
  } else {
    const url = '/' + slug
    return <Redirects url={url}/>
  }

}


const queryBlog = cache(async ({slug}: { slug: Where }) => {
  // const {isEnabled: draft} = draftMode()

  const payload = await getPayload({config: configPromise})
  const result = await payload.find({
    collection: 'posts',
    where: slug,
    limit: 1,
    overrideAccess: true,
    depth: 1,
    // draft
  })

  return result
})
