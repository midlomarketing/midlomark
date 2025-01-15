import {ButtonContainer} from "@/app/(app)/components/Button";
import {PrimaryButton} from "@/app/(app)/components/Button/PrimaryButton";
import {SecondaryButton} from "@/app/(app)/components/Button/SecondaryButton";
import {ImageObject} from "@/app/(app)/components/Media/Media";
import React from "react";
import classes from './index.module.scss'
import {HeroProps} from "@/payload-types";
import {RichText} from "@/app/(app)/components/RichText";

type Props = HeroProps

export function Hero(props: Props) {

  const {
    image,
    textPosition,
    headline, subtext,
    buttons
  } = props

  return <div className={`${classes.heroContainer}`}>
    <div className={classes.imageContainer}>
      {image?.image && typeof image.image !== 'string' && <ImageObject className={classes.image}
                    {...image.image}
      />}
    </div>
    <div className={`${classes.headerAndButtons} ${textPosition === 'Left' ? classes.textLeft : classes.textRight}`}>
      <div className={classes.textContainer}>
        <h1 className={classes.headline}>{headline}</h1>
        {subtext && <RichText className={classes.subheader} data={subtext}/>}
      </div>
      {buttons && <ButtonContainer className={classes.buttons}>
        {buttons?.map((btn) => (
          btn.isPrimary ? <PrimaryButton key={btn.id} {...btn} /> : <SecondaryButton key={btn.id} {...btn} />
        ))}
      </ButtonContainer>}
    </div>
  </div>
}
