import {CreditType} from '@/app/(app)/utils/types'
import {addImage} from '../../Schema'
import {Individual} from '../../Schema/Container'
import Image from 'next/image'
import {ImageObject as ImageObjectType, LogoObjectType} from "@/app/(app)/components/Media/Media/types";

export async function ImageObject({
                                    filename,
                                    altDescription,
                                    width,
                                    height,
                                    creatorType,
                                    creator,
                                    creatorLink,
                                    className,
                                    priority = false,
                                    style,
                                  }: {
  className?: string
  priority?: boolean
  filename: string,
  altDescription: string,
  width: number | `${number}`
  height: number | `${number}`
  creatorType?: string | null
  creator?: string | null
  creatorLink?: string | null
  id?: string,
  style?: {
    objectPosition?: string
  },
}) {
  // console.log(image)
  return (
    <>
      <Individual schema={await addImage({
        src: `${process.env.CLOUDFLARE_BUCKET}/${filename || ``}`,
        credit: {
          'creator': creator,
          'creatorLink': creatorLink,
          'creatorType': creatorType,
        }
      })}/>
      <Image
        src={`${process.env.CLOUDFLARE_BUCKET}/${filename || ``}`}
        height={height || 360}
        width={width || 640}
        alt={altDescription || ``}
        className={className}
        priority={priority}
        style={style}
      />
    </>
  )
}

export async function LogoObject({
                                   image,
                                   className,
                                   priority = true,
                                 }: {
  className?: string
  priority?: boolean
  image: LogoObjectType,
}) {
  // console.log(image)
  return (
    <>
      <Individual schema={await addImage({
        src: `${process.env.CLOUDFLARE_BUCKET}/${image?.filename || ``}`,
        credit: image?.credit
      })}/>
      <Image
        src={`${process.env.CLOUDFLARE_BUCKET}/${image.filename || ``}`}
        height={image.height || 50}
        width={image.width || 50}
        alt={image.altDescription || ``}
        className={className}
        priority={priority}
      />
    </>
  )
}
