import classes from './page.module.scss'
import {Metadata} from 'next'
import {meta} from "@/app/(app)/components/Metadata";
import {getPayload} from 'payload'
import configPromise from '@payload-config'
import {GlobalSetting} from "@/payload-types";
import {getCachedGlobal} from "@/app/(app)/utils/getGlobals";
import {ContentContainer, SectionContainer} from "@/app/(app)/components/PageLayout";
import {ImageObject} from "@/app/(app)/components/Media/Media";
import {SerializeLexical} from "@/app/(app)/components/RichText/Lexical";
import {GeneralDate} from "@/app/(app)/components/Date";
import Link from "next/link";
import {User} from "@/payload-types"

const payload = await getPayload({config: configPromise})

// export const revalidate = 3600

type BlogProps = {
  params: {
    slug: string
  }
}

export async function generateMetadata(params) {
  const {slug} = params

  const pageQuery = {
    slug: {
      equals: 'blog'
    }
  }

  // console.log(params)

  const page = await payload.find({
    collection: 'pages',
    limit: 1,
    where: pageQuery
  })

  return meta({doc: page.docs[0]})

}

export default async function Blogs({params}: BlogProps) {
  const {slug} = params

  const featuredQuery = {
    date: {
      less_than_equal: new Date(),
    },
    status: {
      not_equals: 'Draft',
    },
    featured: {equals: true},
  }

  const getFeatured = await payload.find({
    collection: 'posts',
    limit: 1,
    where: featuredQuery,
  })

  const featured = getFeatured.docs[0]

  const blogQuery = {
    date: {
      less_than_equal: new Date(),
    },
    status: {
      not_equals: 'Draft',
    },
    slug: {
      not_equals: featured?.slug || ``,
    },
  }

  const all = await payload.find({
    collection: 'posts',
    limit: 12,
    page: 1,
    where: blogQuery,
    sort: '-date',
  })

  return (
    <SectionContainer>
      <ContentContainer>
        <h1>All Posts</h1>
        {featured && <section className={classes.featuredPost}>
          <h2>Featured Post</h2>
          <Link href={`/blog/${featured.slug}` || ``} className={classes.featuredCard}>
            <div className={classes.featuredImage}>
              <ImageObject
                filename={typeof featured?.content?.image?.image !== 'string' && featured?.content?.image?.image?.filename || ''}
                width={typeof featured?.content?.image?.image !== 'string' && featured?.content?.image?.image?.width || 640}
                height={typeof featured?.content?.image?.image !== 'string' && featured?.content?.image?.image?.height || 360}
                altDescription={typeof featured?.content?.image?.image !== 'string' && featured?.content?.image?.image?.altDescription || ''}
                creator={typeof featured?.content?.image?.image !== 'string' && featured?.content?.image?.image?.credit?.creator || ''}
                creatorLink={typeof featured?.content?.image?.image !== 'string' && featured?.content?.image?.image?.credit?.creatorLink || ''}
                creatorType={typeof featured?.content?.image?.image !== 'string' && featured?.content?.image?.image?.credit?.creatorLink || ''}
              />
            </div>
            <div className={classes.featuredBody}>
              <div className={classes.featuredHeader}>
                <div className={classes.featuredInfo}>
                  <h3>{featured.title}</h3>
                  <span className={classes.featuredData}>
                    <div>
                      {typeof featured?.content?.authors !== 'string' && featured?.content?.authors?.map((author: User, i, arr) => (
                        <span key={author.id}
                              className={classes.featuredAuthor}>{author.name}{featured?.content?.authors && featured?.content?.authors?.length > 1 ? i + 1 < arr.length ? `, ` : `` : ``}</span>
                      ))}
                    </div>
                    <GeneralDate date={featured.date || ``} includeTime={false} className={classes.cardDate}/>
                  </span>
                  {featured?.content?.summary && <p className={classes.featuredSummary}>
                    {featured?.content?.summary}
                  </p>}
                </div>

              </div>
            </div>
          </Link>
        </section>}
        <section className={classes.recentPosts}>
          {featured && <h2>Recent Posts</h2>}
          <div className={classes.cardRow}>
            {all.docs.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className={classes.card}>
                <div className={classes.cardImage}>
                  <ImageObject
                    filename={typeof post?.content?.image?.image !== 'string' && post?.content?.image?.image?.filename || ''}
                    width={typeof post?.content?.image?.image !== 'string' && post?.content?.image?.image?.width || 640}
                    height={typeof post?.content?.image?.image !== 'string' && post?.content?.image?.image?.height || 360}
                    altDescription={typeof post?.content?.image?.image !== 'string' && post?.content?.image?.image?.altDescription || ''}
                    creator={typeof post?.content?.image?.image !== 'string' && post?.content?.image?.image?.credit?.creator || ''}
                    creatorLink={typeof post?.content?.image?.image !== 'string' && post?.content?.image?.image?.credit?.creatorLink || ''}
                    creatorType={typeof post?.content?.image?.image !== 'string' && post?.content?.image?.image?.credit?.creatorLink || ''}
                  />
                </div>
                <div className={classes.cardBody}>
                  <h3 className={classes.cardTitle}>
                    {post.title}
                  </h3>
                  {typeof post?.content?.authors !== 'string' && post?.content?.authors?.map((author: User) => (
                    <span key={author.id} className={classes.featuredAuthor}>{author.name}</span>
                  ))}
                  <GeneralDate date={post.date || ``} includeTime={false} className={classes.cardDate}/>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </ContentContainer>
    </SectionContainer>
  )
}
