import classes from './page.module.scss'
import Link from 'next/link'
import {Metadata} from 'next'
import {meta} from '@/app/(app)/components/Metadata'
import {getPayload, Where} from 'payload'
import configPromise from '@payload-config'
import {GeneralDate} from '@/app/(app)/components/Date'
import React, {cache, Fragment} from "react";
import {Post, User} from "@/payload-types";
import {Redirects} from "@/app/(app)/components/Redirects";
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {ImageObject} from "@/app/(app)/components/Media/Media";
import {ToTopButton} from "@/app/(app)/components/ToTopButton";
import {BreadCrumbsContainer, Breadcrumbs} from "@/app/(app)/components/Breadcrumbs";
import {PostCard} from "@/app/(app)/components/PostCard/Card";
import {CardRow} from "@/app/(app)/components/PostCard";
import {BlogNav} from "@/app/(app)/components/BlogNav";
import {RichText} from "@/app/(app)/components/RichText";
import {addArticle} from "@/app/(app)/components/Schema";
import {Schema} from "@/app/(app)/components/Schema/Container";
import SocialSection from "@/app/(app)/components/Social/SocialSection";
import SocialIcons from "@/app/(app)/components/Social/SocialIcons";
import {draftMode} from "next/headers";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const payload = await getPayload({config: configPromise})
  const blogs = await payload.find({
    collection: 'posts',
    limit: 1000,
    draft: false,
    overrideAccess: true,
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

    const schema = [
      addArticle(blog)
    ]

    return <article>
      <Schema schema={schema}/>
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
                <div className={classes.blogAuthors}>
                  {content?.authors?.map((author: User, index, arr) => (
                    <Fragment key={author.id}>
                      <div className={classes.blogAuthorInfo}>
                        <Link className={classes.blogAuthorLink}
                              href={`/authors/${author.slug}` || ``}>
                          {author.name} |
                          Posts: {author.postCount}
                        </Link>
                        {author.socialLinks && <SocialSection socialLinks={author.socialLinks} header={false}
                                                              className={classes.authorSocials}/>}
                      </div>
                      {arr.length > index + 1 && <hr className={classes.hr}/>}
                    </Fragment>
                  ))}
                </div>
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
              {...content.image.image}
            />}
            {content?.richText && <RichText className={classes.blogContent} data={content.richText}/>}

            <BlogNav next={getNext} prev={getPrev}/>

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
  const {isEnabled: draft} = await draftMode()

  const payload = await getPayload({config: configPromise})
  const result = await payload.find({
    collection: 'posts',
    where: slug,
    limit: limit,
    overrideAccess: true,
    depth: 2,
    sort: sort,
    draft
  })

  return result
})
