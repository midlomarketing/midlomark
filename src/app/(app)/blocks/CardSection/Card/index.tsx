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
import {Card as CardProps, CardButtonProps, Media} from "@/payload-types";


export default function Card({
                               image, cardHeader, includeButton, button,
                               cardText,
                               className,
                             }: {
  className?: string
  image: Media
  cardHeader: string
  includeButton: boolean
  button?: CardButtonProps
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
              {image && <ImageObject className={classes.cardImage}
                                     image={image}
              />}
            </Link>
          ) : includeButton && button?.openInNewTab ? (
            <a
              rel={`noreferrer noopener`}
              href={button?.link || ``}
              target={`_blank`}
              aria-label={`An image for the card titled ${cardHeader}`}
              title={`An image for the card titled ${cardHeader}`}
            >
              <ImageObject
                image={image}
                className={classes.cardImage}
              />
            </a>
          ) : (
            <ImageObject image={image}
                className={classes.cardImage}
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
