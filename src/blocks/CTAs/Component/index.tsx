import {Button, ButtonContainer} from '@/app/(app)/components/Button'
import classes from './index.module.scss'
import {ContentContainer, SectionContainer} from "@/app/(app)/components/PageLayout";
import {CTAProps} from "@/payload-types";
import Header from "@/app/(app)/components/CustomHeader";
import React from "react";

type Props = CTAProps

export default function CTA(props: Props) {

  const {
    active,
    buttons,
    headerSection,
  } = props

  if (active) {
    return (
      <SectionContainer>
        <ContentContainer>
          <Header {...headerSection} />
          <ButtonContainer numberOfButtons={buttons?.length} className={classes.ctaContainer}>
            {buttons?.map((btn) => (
              <Button
                key={btn.id}
                {...btn}
              />
            ))}
          </ButtonContainer>
        </ContentContainer>
      </SectionContainer>
    )
  }
}
