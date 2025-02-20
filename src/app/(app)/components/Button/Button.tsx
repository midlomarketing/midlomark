import React from 'react'
import {CTAButton} from "src/app/(app)/components/Button/CTAButton";
import {Button as ButtonProps} from "@/payload-types";

type Props = NonNullable<ButtonProps>[number] & {className?: string}

export function Button(props: Props) {

  const {title, link, openInNewTab, className} = props

    return <CTAButton className={className} title={title} link={link} openInNewTab={openInNewTab}/>

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
