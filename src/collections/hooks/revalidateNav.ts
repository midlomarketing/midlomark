import type {GlobalAfterChangeHook} from "payload";
import {revalidateTag} from "next/cache.js";

export const revalidateNav: GlobalAfterChangeHook = ({ doc, req: {payload}}) => {
      payload.logger.info(`Revalidating nav`)
    revalidateTag('global_nav')
    return doc
}