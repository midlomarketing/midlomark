import React from 'react'
import Image from 'next/image'
import {Media} from "@/payload-types";
import type {Payload} from 'payload'

export async function Icon({payload}: { payload: Payload }) {
  const globals = await payload.findGlobal({
    slug: 'global-settings',
    select: {
      logos: true
    }
  })

  const lightModeIcon = globals.logos?.squareLogo as Media
  const darkModeIcon = globals.logos?.darkModeSquare as Media
  const iconUrl = `${process.env.CLOUDFLARE_BUCKET}/${lightModeIcon.filename}`
  const darkIconUrl = `${process.env.CLOUDFLARE_BUCKET}/${darkModeIcon.filename}`

  return <>
      <Image
    className={`light-mode`}
    src={iconUrl}
    alt={lightModeIcon.altDescription || ''}
    width={lightModeIcon.width || 640}
    height={lightModeIcon.height || 360}
  />
    <Image
    className={`dark-mode`}
    src={darkIconUrl}
    alt={darkModeIcon?.altDescription || ''}
    width={darkModeIcon?.width || 640}
    height={darkModeIcon?.height || 360}
  />
  </>
}
