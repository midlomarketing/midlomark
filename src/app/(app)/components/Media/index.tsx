import { Fragment } from 'react'
import { ImageObject, VideoObject } from '@/app/(app)/components/Media/Media'
import {Media as MediaProps} from '@/payload-types'

export const Media = (props: { className?: string; resource: MediaProps; htmlElement?: 'div' }) => {
  const { className, resource, htmlElement = 'div' } = props

  const isVideo = resource?.mimeType?.includes('video')
  const Tag = htmlElement || Fragment

  return (
    <Tag {...(htmlElement !== null ? { className } : {})}>
      {/*TODO: set up VideoObject for embedding*/}
      {isVideo ? null : (
        <ImageObject
          image={resource}
        /> // eslint-disable-line
      )}
    </Tag>
  )
}
