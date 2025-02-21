import type { MetadataRoute } from 'next'
import {getServerSideURL} from "@/utilities/getURL";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin',
    },
    sitemap: `${getServerSideURL()}/sitemap.xml`,
  }
}
