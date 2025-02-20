import Link from "next/link";
import classes from './index.module.scss'
import {Schema} from "@/app/(app)/components/Schema/Container";
import {addBreadcrumbs} from "@/app/(app)/components/Schema";

export type BreadcrumbProps = {
  link?: string
  name: string
}[]

export function Breadcrumbs({breadcrumbs}: { breadcrumbs: BreadcrumbProps }) {
  const schema = [
    addBreadcrumbs(breadcrumbs)
  ]
  return <>
    <Schema schema={schema} />
    {breadcrumbs.map((breadcrumb, index, arr) => (
    index + 1 < arr.length ? <small className={classes.breadcrumb} key={index}><Link className={classes.breadcrumbLink}
                                                                                     href={`${breadcrumb.link}`}>{breadcrumb.name}</Link>
        <svg xmlns="http://www.w3.org/2000/svg" height="1rem" viewBox="0 -960 960 960" width="24px" fill="currentColor">
          <path
            d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/>
        </svg>
      </small> :
      <small className={classes.breadcrumb} key={index}>{breadcrumb.name.toLowerCase()}</small>
  ))}
  </>
}
