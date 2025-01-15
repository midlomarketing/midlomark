import {addImage} from '../../Schema'
import {Individual} from '../../Schema/Container'
import Image from 'next/image'
import type {Media} from "@/payload-types";

type Props = Media & {className?: string, priority?: boolean}

export async function ImageObject(props: Props) {

  const {filename, height, width, altDescription, className, priority} = props

  return (
    <>
      {/*<Individual schema={await addImage(image)}/>*/}
      <Image
        src={`${process.env.CLOUDFLARE_BUCKET}/${filename}`}
        height={height || 360}
        width={width || 640}
        alt={altDescription || ``}
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
