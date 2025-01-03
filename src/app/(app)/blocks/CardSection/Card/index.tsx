import {Button, ButtonContainer} from '../../../components/Button'
import classes from './index.module.scss'
import Link from 'next/link'
import {SerializeLexical} from '../../../components/RichText/Lexical'
import {ImageObject} from '@/app/(app)/components/Media/Media'
import {
  RichTextType,
  YesOrNo
} from '@/app/(app)/utils/types'
import {ImageObject as ImageObjectType} from '@/app/(app)/components/Media/Media/types'


export default function Card({
                               image, cardHeader, includeButton, button,
                               cardText,
                               className,
                             }: {
  className?: string
  image: ImageObjectType
  cardHeader: string
  includeButton: boolean
  button?: {
    title?: string,
    link?: string,
    openInNewTab?: YesOrNo
    isPrimary?: false
  }
  cardText: RichTextType

}) {

  return (
    <div className={`${classes.cardContainer} ${className}`}> {/* card wrapper */}
      <div className={classes.innerCard}> {/* innerCard */}
        {/* card header */}
        <div className={classes.cardImageContainer}>
          {includeButton && !button?.openInNewTab ? (
            <Link href={button?.link || ``}
                  aria-label={`An image for the card titled ${cardHeader}`}
                  title={`An image for the card titled ${cardHeader}`}
            >
              <ImageObject className={classes.cardImage} filename={image?.image?.filename || ''}
                           width={image?.image?.width || 640}
                           height={image?.image?.height || 360}
                           altDescription={image?.image?.altDescription || ''}
                           creator={image?.image?.credit?.creator || ''}
                           creatorLink={image?.image?.credit?.creatorLink || ''}
                           creatorType={image?.image?.credit?.creatorLink || ''}/>
            </Link>
          ) : includeButton && button?.openInNewTab ? (
            <a
              rel={`noreferrer noopener`}
              href={button?.link || ``}
              target={`_blank`}
              aria-label={`An image for the card titled ${cardHeader}`}
              title={`An image for the card titled ${cardHeader}`}
            >
              <ImageObject className={classes.cardImage} filename={image?.image?.filename || ''}
                           width={image?.image?.width || 640}
                           height={image?.image?.height || 360}
                           altDescription={image?.image?.altDescription || ''}
                           creator={image?.image?.credit?.creator || ''}
                           creatorLink={image?.image?.credit?.creatorLink || ''}
                           creatorType={image?.image?.credit?.creatorLink || ''}/>
            </a>
          ) : (
            <ImageObject className={classes.cardImage} filename={image?.image?.filename || ''}
                         width={image?.image?.width || 640}
                         height={image?.image?.height || 360}
                         altDescription={image?.image?.altDescription || ''}
                         creator={image?.image?.credit?.creator || ''}
                         creatorLink={image?.image?.credit?.creatorLink || ''}
                         creatorType={image?.image?.credit?.creatorLink || ''}
            />
          )}
        </div>
        {/* card footer */}
        <div className={classes.cardFooter}>
          <h3 className={classes.cardHeader}>{cardHeader}</h3>
          <SerializeLexical nodes={cardText?.root?.children}/>
          {includeButton && (
            <ButtonContainer>
              <Button
                {...button}
                className={classes.cardButton}
              />
            </ButtonContainer>
          )}
        </div>
      </div>
    </div>
  )
}
