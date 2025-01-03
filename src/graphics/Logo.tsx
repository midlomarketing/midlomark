// import React from 'react'
// import Image from 'next/image'
//
//
// export const Logo = async () => {
//     // const iconUrl = `${process.env.CLOUDFLARE_BUCKET}/lvc-primary-full.svg`
//     // const darkIconUrl = `${process.env.CLOUDFLARE_BUCKET}/lvc-primary-inverse.svg`
//
//     const globals = await fetch(`${process.env.API_BASE_URL}/api/globals/global-settings`).then((res) =>
//         res.json(),
//     )
//
//     const iconUrl = `${process.env.CLOUDFLARE_BUCKET}/${globals.logos.landscapeLogo.filename}`
//     const darkIconUrl = `${process.env.CLOUDFLARE_BUCKET}/${globals.logos.darkModeLandscape.filename}`
//
//     return (
//         <picture>
//             <source width={919} height={303} srcSet={darkIconUrl} media={'(prefers-color-scheme: dark)'}/>
//             <Image
//                 loading={'eager'}
//                 style={{
//                     position: 'unset',
//                 }}
//                 width={919}
//                 height={303}
//                 src={iconUrl}
//                 alt={'LVC Logo'}
//             />
//         </picture>
//     )
// }
