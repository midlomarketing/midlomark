import type {CollectionAfterChangeHook} from "payload";
import {revalidatePath} from "next/cache.js";
import type {Page} from '@/payload-types'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
    doc,
    previousDoc,
    req: {payload}
}) => {
    if (doc.pageStatus === 'Published') {
        const path = doc.slug === 'home' ? '/' : `/${doc.slug}`
        payload.logger.info(`Revalidating page at path: ${path}`)
        revalidatePath(path)
    }

    if (previousDoc?.pageStatus === 'Published' && doc.pageStatus !== 'Published') {
        const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`
        payload.logger.info(`Revalidating old page at path: ${oldPath}`)
        revalidatePath(oldPath)
    }

    return doc
}
