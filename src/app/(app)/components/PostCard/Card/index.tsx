import classes from "./index.module.scss";
import Link from "next/link";
import {ImageObject} from "@/app/(app)/components/Media/Media";
import {User} from "@/payload-types";
import {GeneralDate} from "@/app/(app)/components/Date";

interface PostCardProps {
  id: string,
  slug: string,
  title: string,
  author?: User[],
  date: Date | string,
  filename: string,
  width: number,
  height: number,
  altDescription?: string,
    creator?: string,
    creatorLink?: string,
    creatorType?: string,

}

export function PostCard(post: PostCardProps) {

  return (<Link key={post.id} href={`/blog/${post.slug}`} className={classes.card}>
      <div className={classes.cardImage}>
        <ImageObject
          filename={post.filename}
          width={post.width}
          height={post.height}
          altDescription={post.altDescription || ``}
          creator={post.creator || ``}
          creatorLink={post.creatorLink || ``}
          creatorType={post.creatorType || ``}
        />
      </div>
      <div className={classes.cardBody}>
        <h3 className={classes.cardTitle}>
          {post.title}
        </h3>
        {post.author?.map((author: User, index, array) => (
          <span key={author.id} className={classes.featuredAuthor}>{array.length > index + 1 ? `${author.name}, ` : author.name}</span>
        ))}
        <GeneralDate date={post.date || ``} includeTime={false} className={classes.cardDate}/>
      </div>
    </Link>
  )
}
