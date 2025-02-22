import type {GlobalAfterChangeHook} from "payload";
import {revalidateTag} from "next/cache.js";

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: {payload}}) => {
      payload.logger.info(`Revalidating footer`)
    revalidateTag('global_footer')
    return doc
}