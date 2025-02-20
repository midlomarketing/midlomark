import React from 'react'
import Image from 'next/image'
import {Media} from "@/payload-types";

// // TODO: convert new logo to svg for ICON and LOGO : https://github.com/payloadcms/payload/blob/main/examples/whitelabel/src/graphics/Logo/index.tsx
//
//
export const Icon = async () => {

  const globals = await fetch(`${process.env.API_BASE_URL}/api/globals/global-settings`).then((res) =>
    res.json(),
  )

  const lightModeIcon = globals.logos.squareLogo as Media
  const darkModeIcon = globals.logos.darkModeSquare as Media
  const iconUrl = `${process.env.CLOUDFLARE_BUCKET}/${globals.logos.squareLogo.filename}`
  const darkIconUrl = `${process.env.CLOUDFLARE_BUCKET}/${globals.logos.darkModeSquare.filename}`


  return <Image src={darkIconUrl} alt={darkModeIcon.altDescription || ''} width={darkModeIcon.width || 640}
                height={darkModeIcon.height || 360}/>
}
