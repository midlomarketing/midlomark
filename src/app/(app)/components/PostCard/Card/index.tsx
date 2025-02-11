import classes from "./index.module.scss";
import Link from "next/link";
import {ImageObject} from "@/app/(app)/components/Media/Media";
import {Category, Post, User} from "@/payload-types";
import {GeneralDate} from "@/app/(app)/components/Date";

export function PostCard(post: Post) {

  return (<Link key={post.id} href={`/blog/${post.slug}`} className={classes.card}>
      {typeof post.content?.image?.image !== 'string' && post.content?.image?.image && <div className={classes.cardImage}>
        <ImageObject
          {...post.content.image.image}
        />
      </div>}
      <div className={classes.cardBody}>
        <h3 className={classes.cardTitle}>
          {post.title}
        </h3>
        {post.content?.authors?.map((author: User, index, array) => (
          <span key={author.id} className={classes.author}>{array.length > index + 1 ? `${author.name}, ` : author.name}</span>
        ))}
        <GeneralDate date={post.date || ``} includeTime={false} className={classes.cardDate}/>
        {post.content?.category && <div className={classes.postCategories}>
          {post.content?.category.map((category: Category, idx) => (
            <span className={classes.categoryText} key={category.id}>{category.title}</span>
            ))}
        </div>}
      </div>
    </Link>
  )
}
