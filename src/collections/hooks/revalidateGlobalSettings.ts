import type {GlobalAfterChangeHook} from "payload";
import {revalidateTag} from "next/cache.js";

export const revalidateGlobalSettings: GlobalAfterChangeHook = ({ doc, req: {payload}}) => {
    payload.logger.info(`Revalidating global settings`)
    revalidateTag('global_global-settings')
    return doc
}