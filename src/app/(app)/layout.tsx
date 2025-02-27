import './global.css'
import { Nav } from './components/Nav'
import {Footer} from './components/Footer'
import {GoogleTagManager} from '@next/third-parties/google'
import StickyBannerContainer from './components/Nav/StickyBanner'
import React from 'react'
import {GlobalSetting} from "@/payload-types";
import {getCachedGlobal} from "@/app/(app)/utils/getGlobals";
import Script from "next/script";
import {addLogo} from "@/app/(app)/components/Schema";
import {Schema} from "@/app/(app)/components/Schema/Container";

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const globals: GlobalSetting = await getCachedGlobal('global-settings', 1)()

  const schema = [
    await addLogo({...globals})
  ]

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href={`${process.env.CLOUDFLARE_BUCKET}/${
            typeof globals.logos?.squareLogo !== 'string' && globals.logos?.squareLogo?.filename
          }?`}
          sizes="16x16 32x32 48x48"
          type="image/png"
          media="(prefers-color-scheme: light)"
        />
        {globals.logos?.darkModeSquare && (
          <link
            rel="icon"
            href={`${process.env.CLOUDFLARE_BUCKET}/${
              typeof globals.logos?.darkModeSquare !== 'string' &&
              globals.logos?.darkModeSquare?.filename
            }?`}
            sizes="16x16 32x32 48x48"
            type="image/png"
            media="(prefers-color-scheme: dark)"
          />
        )}
        <link
          rel="alternate"
          type="application/rss+xml"
          href="#"
        />
      </head>
      <body>
        {globals.stickyBanner && <StickyBannerContainer />}
        <Nav />
        {children}
        <Footer />
      </body>
      <Schema schema={schema} />
      {globals.googleTagManagerCode && <GoogleTagManager gtmId={globals.googleTagManagerCode}/>}
    </html>
  )
}
