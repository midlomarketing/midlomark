import React from 'react'
import Image from 'next/image'
import {Media} from "@/payload-types";


export const Logo = async () => {


  const globals = await fetch(`${process.env.API_BASE_URL}/api/globals/global-settings`).then((res) =>
    res.json(),
  )

  const lightModeIcon = globals.logos.landscapeLogo as Media
  const darkModeIcon = globals.logos.darkModeLandscape as Media

  const iconUrl = `${process.env.CLOUDFLARE_BUCKET}/${globals.logos.landscapeLogo.filename}`
  const darkIconUrl = `${process.env.CLOUDFLARE_BUCKET}/${globals.logos.darkModeLandscape?.filename || ''}`

  return <Image
    src={darkIconUrl}
    alt={darkModeIcon?.altDescription || ''}
    width={darkModeIcon?.width || 640}
    height={darkModeIcon?.height || 360}
  />

}
