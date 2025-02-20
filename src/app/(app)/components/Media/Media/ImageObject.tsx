import {addImage} from '../../Schema'
import {Schema} from '../../Schema/Container'
import Image from 'next/image'
import type {Media} from "@/payload-types";

type Props = Media & {className?: string, priority?: boolean}

export async function ImageObject(props: Props) {

  const {filename, height, width, altDescription, className, priority} = props

  return (
    <>
      <Schema schema={addImage(props)}/>
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
