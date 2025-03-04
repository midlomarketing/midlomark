import classes from './page.module.scss'
import {Metadata} from 'next'
import {meta} from "@/app/(app)/components/Metadata";
import {getPayload} from 'payload'
import configPromise from '@payload-config'
import {GlobalSetting, Post} from "@/payload-types";
import {getCachedGlobal} from "@/app/(app)/utils/getGlobals";
import {ContentContainer, SectionContainer} from "@/app/(app)/components/PageLayout";
import {ImageObject} from "@/app/(app)/components/Media/Media";
import {GeneralDate} from "@/app/(app)/components/Date";
import Link from "next/link";
import {User} from "@/payload-types"
import {PostCard} from "@/app/(app)/components/PostCard/Card";
import {CardRow} from "@/app/(app)/components/PostCard";

const payload = await getPayload({config: configPromise})

// export const revalidate = 3600

type BlogProps = {
  params: Promise<{
    slug?: string
  }>
}

// await payload.update({
//   collection: 'posts',
//   where: {},
//   data: {
//     _status: 'published'
//   }
// })

export async function generateMetadata() {
  const pageQuery = {
    slug: {
      equals: 'blog'
    }
  }

  const page = await payload.find({
    collection: 'pages',
    limit: 1,
    where: pageQuery
  })

  return meta({doc: page.docs[0]})

}

export default async function Blogs() {

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
            {featured.content?.image?.image && typeof featured.content.image.image !== 'string' && <div className={classes.featuredImage}>
              <ImageObject {...featured.content?.image.image} />
            </div>}
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
                    <GeneralDate date={featured.date || ``} includeTime={false} className={classes.featuredDate}/>
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
          <CardRow>
            {all.docs.map((post: Post) => (
              <PostCard
                key={post.id}
                {...post}
              />
            ))}
          </CardRow>
        </section>
      </ContentContainer>
    </SectionContainer>
  )
}
