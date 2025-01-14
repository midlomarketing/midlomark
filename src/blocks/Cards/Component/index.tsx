import Header from '../../../app/(app)/components/CustomHeader'
import {SectionContainer, ContentContainer} from "@/app/(app)/components/PageLayout";
import {CardGrid} from "./CardGrid";
import type {
  CardSection as CardSectionProps
} from "@/payload-types";
import classes from "./index.module.scss";
import Link from "next/link";
import {Button, ButtonContainer} from "@/app/(app)/components/Button";
import {ImageObject} from "@/app/(app)/components/Media/Media";
import {RichText} from "@/app/(app)/components/RichText";
import React from "react";

export default function CardSection(props: CardSectionProps) {

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
                    {card.includeButton && !card.button?.openInNewTab ? (
                      <Link href={card.button?.link || ``}
                            aria-label={`An image for the card titled ${card.cardHeader}`}
                            title={`An image for the card titled ${card.cardHeader}`}
                      >
                        {card.image?.image && typeof card.image.image !== 'string' &&
                          <ImageObject
                            className={classes.cardImage}
                            {...card.image.image}
                        />}
                      </Link>
                    ) : card.includeButton && card.button?.openInNewTab ? (
                      <a
                        rel={`noreferrer noopener`}
                        href={card.button?.link || ``}
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
                    {card.includeButton && (
                      <ButtonContainer>
                        <Button
                          {...card.button}
                          className={classes.cardButton}
                        />
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
