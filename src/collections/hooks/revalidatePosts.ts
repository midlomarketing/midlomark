import type {CollectionAfterChangeHook} from "payload";
import {revalidatePath} from "next/cache.js";
import type {Post} from '@/payload-types'

export const revalidatePosts: CollectionAfterChangeHook<Post> = async (
  {
    doc,
    previousDoc,
    req: {payload}
  }
) => {
  if (doc?.status === 'Published') {
    const path = `/blog/${
      doc.slug
    }`
    payload.logger.info(`Revalidating blog at path: ${path}`)
    revalidatePath(path)
  }
  if (previousDoc?.status === 'Published' && doc?.status !== 'Published') {
    const oldPath = `/blog/${previousDoc.slug
    }`
    payload.logger.info(`Revalidating old message at path: ${oldPath}`)
    revalidatePath(oldPath)
  }

  return doc
}
