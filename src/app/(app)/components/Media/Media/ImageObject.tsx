import {addImage} from '../../Schema'
import {Individual} from '../../Schema/Container'
import Image from 'next/image'
import {Media} from "@/payload-types";

export async function ImageObject( {image, className, priority}: {
  image: Media,
  className?: string,
  priority?: boolean
}) {
  return (
    <>
      <Individual schema={await addImage(image)}/>
      <Image
        src={`${process.env.CLOUDFLARE_BUCKET}/${image.filename || ``}`}
        height={image.height || 360}
        width={image.width || 640}
        alt={image.altDescription || ``}
        className={className}
        priority={priority}
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
  image: Media,
}) {
  // console.log(image)
  return (
    <>
      <Individual schema={await addImage(image)}/>
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
