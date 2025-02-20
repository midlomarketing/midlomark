import Header from '../../../app/(app)/components/CustomHeader'
import {SectionContainer, ContentContainer} from "@/app/(app)/components/PageLayout";
import {CardGrid} from "./CardGrid";
import type {
  CardSection as CardSectionProps
} from "@/payload-types";
import classes from "./index.module.scss";
import Link from "next/link";
import {ButtonContainer} from "@/app/(app)/components/Button";
import {ImageObject} from "@/app/(app)/components/Media/Media";
import {RichText} from "@/app/(app)/components/RichText";
import React from "react";
import {CTAButton} from "@/app/(app)/components/Button/CTAButton";

export function CardSection(props: CardSectionProps) {

  const {active, card, headerSection} = props

  if (active) {

    return (
      <SectionContainer>
        <ContentContainer>
          <Header {...headerSection} />
          {card && <CardGrid cardLength={card.length}>
            {card.map((card) => (
              <div className={`${classes.cardContainer}`} key={card.id}> {/* card wrapper */}
                <div className={classes.innerCard}> {/* innerCard */}
                  {/* card header */}
                  <div className={classes.cardImageContainer}>
                    {card.includeButton && card.buttons?.[0].linkType !== 'External' ? (
                      <Link href={
                        card.buttons?.[0].internalLink?.relationTo !== 'pages'
                          ? `/${typeof card.buttons?.[0].internalLink?.value !== 'string' && `${card.buttons?.[0].internalLink?.relationTo}/${card.buttons?.[0].internalLink?.value.slug}`}`
                          : typeof card.buttons?.[0].internalLink?.value !== 'string' && card.buttons?.[0].internalLink?.value.slug === 'home'
                            ? '/'
                            : `/${typeof card.buttons?.[0].internalLink?.value !== 'string' && `${card.buttons?.[0].internalLink?.value.slug}`}`
                      }
                            aria-label={`An image for the card titled ${card.cardHeader}`}
                            title={`An image for the card titled ${card.cardHeader}`}
                            target={card.buttons?.[0].openInNewTab ? '_blank' : '_self'}
                      >
                        {card.image?.image && typeof card.image.image !== 'string' &&
                          <ImageObject
                            className={classes.cardImage}
                            {...card.image.image}
                          />}
                      </Link>
                    ) : card.includeButton && card.buttons?.[0].linkType === 'External' ? (
                      <a
                        rel={`noreferrer noopener`}
                        href={card.buttons?.[0].link || ``}
                        target={`_blank`}
                        aria-label={`An image for the card titled ${card.cardHeader}`}
                        title={`An image for the card titled ${card.cardHeader}`}
                      >
                        {card.image?.image && typeof card.image.image !== 'string' &&
                          <ImageObject
                            className={classes.cardImage}
                            {...card.image.image}
                          />}
                      </a>
                    ) : (
                      card.image?.image && typeof card.image.image !== 'string' &&
                      <ImageObject
                        className={classes.cardImage}
                        {...card.image.image}
                      />
                    )}
                  </div>
                  {/* card footer */}
                  <div className={classes.cardFooter}>
                    <h3 className={classes.cardHeader}>{card.cardHeader}</h3>
                    {card.cardText && <RichText data={card.cardText}/>}
                    {card.buttons && card.includeButton && card.buttons?.length > 0 && (
                      <ButtonContainer>
                        {card.buttons?.map((btn) => (
                          <CTAButton key={btn.id} {...btn} />
                        ))}
                      </ButtonContainer>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardGrid>}
        </ContentContainer>
      </SectionContainer>
    )
  }
}
