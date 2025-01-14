import React from 'react'
import {PrimaryButton} from "@/app/(app)/components/Button/PrimaryButton";
import {SecondaryButton} from "@/app/(app)/components/Button/SecondaryButton";
import type {CardButtonProps} from "@/payload-types";

type Props = CardButtonProps & {className?: string}

export function Button(props: Props) {

  const {isPrimary, title, link, openInNewTab, className} = props

    return (isPrimary ? <PrimaryButton className={className} title={title} link={link} label={title} openInNewTab={openInNewTab}/> :
        <SecondaryButton className={className} title={title} link={link} label={title} openInNewTab={openInNewTab}/>)

    // {/*      TODO loading button */}
    // {/*<Link*/}
    // {/*  href={link}*/}
    // {/*  target={*/}
    // {/*    openInNewTab === 'Yes' ||*/}
    // {/*    !link?.includes('localhost')*/}
    // {/*      ? '_blank'*/}
    // {/*      : '_self'*/}
    // {/*  }*/}
    // {/*  className={`${classes.btn} ${classes.btnLoading} ${className}`}*/}
    // {/*  title={label}*/}
    // {/*>*/}
    // {/*  /!* <p className='h-6'></p> *!/*/}
    // {/*</Link>*/}

}
