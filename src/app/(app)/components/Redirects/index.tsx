import type React from 'react'
import { getCachedRedirects } from "../../utils/getRedirects";
import {notFound, redirect} from "next/navigation";

interface Props {
    disableNotFound?: boolean
    url: string
}

export const Redirects: React.FC<Props> = async ({disableNotFound, url}) => {
    const slug = url.startsWith('/') ? url : `${url}`

    const redirects = await getCachedRedirects()()
    const redirectItem = redirects.find((redirect) => redirect.source === slug)

    if (redirectItem) {
        if (redirectItem.destination) {
            redirect(redirectItem.destination)
        }
    }

    if (disableNotFound) return null
    return notFound()
}
