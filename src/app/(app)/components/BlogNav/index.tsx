import Link from "next/link";
import {Post} from "@/payload-types";
import classes from './index.module.scss'

export const BlogNav = ({next, prev}:
                          {
                            next?: Post
                            prev?: Post
                          }) => {
  return <section className={classes.blogNavContainer}>
    {next && <div className={classes.blogNavItem}>
      <Link href={`/blog/${next.slug}`} className={classes.nextBlog}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
             fill="currentColor">
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
        </svg>
        <p>{next.title}</p>
      </Link>
    </div>}
    {prev && <div className={classes.blogNavItem}>
      <Link href={`/blog/${prev.slug}`} className={classes.prevBlog}>
        <p>{prev.title}</p>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
             fill="currentColor">
          <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
        </svg>
      </Link>
    </div>}
  </section>
}
