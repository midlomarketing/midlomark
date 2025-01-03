import Link from 'next/link'
import classes from './index.module.scss'
import { Category } from '@/payload-types'

export function CategoryLink({
  category,
  activeLinks,
}: {
  category?: Category
  activeLinks: boolean
}) {
  return activeLinks ? (
    <Link href={`/categories/${category?.id}`} className={classes.categoryLinks}>
      #{category?.id}
    </Link>
  ) : (
    <p className={classes.names}>#{category?.id}</p>
  )
}
