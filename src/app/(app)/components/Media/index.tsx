import { Fragment } from 'react'
import { ImageObject, VideoObject } from '@/app/(app)/components/Media/Media'

export const Media = (props: { className?: string; resource: any; htmlElement?: 'div' }) => {
  const { className, resource, htmlElement = 'div' } = props

  const isVideo = typeof resource !== 'string' && resource?.mimeType?.includes('video')
  const Tag = htmlElement || Fragment

  return (
    <Tag {...(htmlElement !== null ? { className } : {})}>
      {/*TODO: set up VideoObject for embedding*/}
      {isVideo ? null : (
        <ImageObject
          filename={resource?.image?.image?.filename || ''}
              width={resource?.image?.image?.width || 640}
              height={resource?.image?.image?.height || 360}
              altDescription={resource?.image?.image?.altDescription || ''}
              creator={resource?.image?.image?.credit?.creator || ''}
              creatorLink={resource?.image?.image?.credit?.creatorLink || ''}
              creatorType={resource?.image?.image?.credit?.creatorLink || ''}
          // width={resource.width || 640}
          // height={resource.height || 360}
          // src={`${process.env.CLOUDFLARE_BUCKET}/${resource.filename}`}
          // alt={resource.altDescription || ``}
        /> // eslint-disable-line
      )}
    </Tag>
  )
}
