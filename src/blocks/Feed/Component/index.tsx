import {Category, PostFeed} from "@/payload-types";
import {cache} from "react";
import {getPayload, Where} from "payload";
import configPromise from "@payload-config";
import Header from "@/app/(app)/components/CustomHeader";
import {ContentContainer, SectionContainer} from "@/app/(app)/components/PageLayout";
import {CardRow, PostCard} from "@/app/(app)/components/PostCard";
import {headers} from "next/headers";

type Props = PostFeed

export async function FeedSegment(props: Props) {


  const categories = props.feedCategory?.map((category: Category) => category.slug)

  const blogQuery = {
    'content.category.slug': {
      in: categories
    },
    date: {
      less_than_equal: new Date(),
    }
  }
  const posts = await queryBlog({slug: blogQuery, limit: 3, sort: '-date'})

  if (props.active) {
    return (
      <SectionContainer>
        <ContentContainer>
          <Header {...props.headerSection} />
          <CardRow>
            {posts.docs.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </CardRow>
        </ContentContainer>
      </SectionContainer>
    )
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
