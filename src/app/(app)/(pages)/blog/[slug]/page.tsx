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
import {GlobalSetting, Post} from "@/payload-types";
import {getCachedGlobal} from "@/app/(app)/utils/getGlobals";
import {Redirects} from "@/app/(app)/components/Redirects";
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {ImageObject} from "@/app/(app)/components/Media/Media";
import {ToTopButton} from "@/app/(app)/components/ToTopButton";
import {BreadCrumbsContainer, Breadcrumbs} from "@/app/(app)/components/Breadcrumbs";
import {PostCard} from "@/app/(app)/components/PostCard/Card";
import {CardRow} from "@/app/(app)/components/PostCard";
import {BlogNav} from "@/app/(app)/components/BlogNav";

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
  const response = await queryBlog({slug: blogQuery, limit: 1})
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
  const response = await queryBlog({slug: blogQuery, limit: 1})
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

    const categoryArray = typeof blog.content?.category !== 'string' &&
      blog.content?.category?.map(category => typeof category !== 'string' && category.slug) || []

    // console.log(categoryArray)

    const categoryQuery = {
      'content.category.slug': {
        in: categoryArray
      }
    }

    const relatedPosts = await queryBlog({slug: categoryQuery, limit: 4, sort: '-date'})

    const nextQuery = {
      date: {
        greater_than: blog.date,
      },
    }

    const prevQuery = {
      date: {
        less_than: blog.date,
      },
    }

    const getNext = await queryBlog({slug: nextQuery, limit: 1}).then(res => res.docs[0])
    const getPrev = await queryBlog({slug: prevQuery, limit: 1, sort: '-date'}).then(res => res.docs[0])

    // console.log(relatedPosts)

    return <article>
      <Redirects url={url} disableNotFound/>
      <SectionContainer>
        <div className={classes.blogContainer}>
          {/* sidebar */}
          <aside className={classes.sidebarContainer}>
            <div className={classes.sidebar}>
              <BreadCrumbsContainer>
                <Breadcrumbs breadcrumbs={breadcrumbs}/>
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
            {typeof content?.image?.image !== 'string' && content?.image?.image && <ImageObject
              className={classes.blogImage}
              image={content.image.image}
            />}
            <SerializeLexical className={classes.blogContent} nodes={content?.richText?.root.children}/>

            <BlogNav next={getNext} prev={getPrev} />

            {relatedPosts && relatedPosts.docs.length > 0 && (<section>
                <h3>Related Posts</h3>
                <CardRow>
                {relatedPosts.docs?.map((relatedPost: Post) => (
                    <PostCard
                      key={relatedPost.id}
                      {...relatedPost}
                      />
                  ))}
                </CardRow>
              </section>
            )}
          </main>
        </div>
        <ToTopButton/>
      </SectionContainer>

    </article>
  } else {
    const url = '/' + slug
    return <Redirects url={url}/>
  }

}


const queryBlog = cache(async ({slug, limit, sort = 'date'}: { slug: Where, limit: number, sort?: string }) => {
  // const {isEnabled: draft} = draftMode()

  const payload = await getPayload({config: configPromise})
  const result = await payload.find({
    collection: 'posts',
    where: slug,
    limit: limit,
    overrideAccess: true,
    depth: 2,
    sort: sort
    // draft
  })

  return result
})
