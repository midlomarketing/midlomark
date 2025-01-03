// import React from 'react'
// import Image from 'next/image'
//
// // TODO: convert new logo to svg for ICON and LOGO : https://github.com/payloadcms/payload/blob/main/examples/whitelabel/src/graphics/Logo/index.tsx
//
//
// export const Icon = async () => {
//     // const iconUrl = `${process.env.CLOUDFLARE_BUCKET}/lvc-icon-full.webp`
//     // const darkIconUrl = `${process.env.CLOUDFLARE_BUCKET}/lvc-icon-white.webp`
//
//     const globals = await fetch(`${process.env.API_BASE_URL}/api/globals/global-settings`).then((res) =>
//         res.json(),
//     )
//
//     const iconUrl = `${process.env.CLOUDFLARE_BUCKET}/${globals.logos.squareLogo.filename}`
//     const darkIconUrl = `${process.env.CLOUDFLARE_BUCKET}/${globals.logos.darkModeSquare.filename}`
//
//
//     return (
//         <picture>
//             <source
//                 width={globals.logos.darkModeSquare.width || 1385}
//                 height={globals.logos.darkModeSquare.height || 1385}
//                 srcSet={darkIconUrl}
//                 media={'(prefers-color-scheme: dark)'}
//             />
//             <Image
//                 loading={'eager'}
//                 width={globals.logos.squareLogo.width}
//                 height={globals.logos.squareLogo.height}
//                 style={{position: 'unset'}}
//                 src={iconUrl}
//                 alt={'LVC Logo'}
//             />
//         </picture>
//     )
// }
