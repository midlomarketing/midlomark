import {SerializeLexical} from "@/app/(app)/components/RichText/Lexical";
import {ButtonContainer} from "@/app/(app)/components/Button";
import {PrimaryButton} from "@/app/(app)/components/Button/PrimaryButton";
import {SecondaryButton} from "@/app/(app)/components/Button/SecondaryButton";
import {ImageObject} from "@/app/(app)/components/Media/Media";
import React from "react";
import {
  AButton,
  RichTextType
} from "@/app/(app)/utils/types";
import {ImageObject as ImageObjectType} from '@/app/(app)/components/Media/Media/types'
import classes from './index.module.scss'

export function Hero({
                       headline,
                       subtext,
                       buttons, image, textPosition
                     }: {
  headline: string
  subtext?: RichTextType
  buttons?: AButton[]
  image: ImageObjectType
  textPosition?: string
}) {
  return <div className={`${classes.heroContainer}`}>
    <div className={classes.imageContainer}>
      <ImageObject className={classes.image}
                   filename={image?.image?.filename || ''}
                   width={image?.image?.width || 640}
                   height={image?.image?.height || 360}
                   altDescription={image?.image?.altDescription || ''}
                   creator={image?.image?.credit?.creator || ''}
                   creatorLink={image?.image?.credit?.creatorLink || ''}
                   creatorType={image?.image?.credit?.creatorLink || ''}
      />
    </div>
    <div className={`${classes.headerAndButtons} ${textPosition === 'Left' ? classes.textLeft : classes.textRight}`}>
      <div className={classes.textContainer}>
        <h1 className={classes.headline}>{headline}</h1>
        {subtext && <SerializeLexical className={classes.subheader} nodes={subtext?.root?.children || []}/>}
      </div>
      {buttons && <ButtonContainer className={classes.buttons}>
        {buttons?.map((btn) => (
          btn.isPrimary ? <PrimaryButton key={btn.id} {...btn} /> : <SecondaryButton key={btn.id} {...btn} />
        ))}
      </ButtonContainer>}
    </div>
  </div>
}
