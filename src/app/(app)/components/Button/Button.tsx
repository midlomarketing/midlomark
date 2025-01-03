import React from 'react'
import {AButton, YesOrNo} from '../../utils/types'
import {PrimaryButton} from "@/app/(app)/components/Button/PrimaryButton";
import {SecondaryButton} from "@/app/(app)/components/Button/SecondaryButton";

export function Button({link, openInNewTab, isPrimary, label, title, className}: AButton | {
    title?: string,
    link?: string,
    openInNewTab?: YesOrNo | boolean
    isPrimary?: false
    label?: string,
    className?: string,
}) {

    return (isPrimary ? <PrimaryButton className={className} title={title} link={link} label={label} openInNewTab={openInNewTab}/> :
        <SecondaryButton className={className} title={title} link={link} label={label} openInNewTab={openInNewTab}/>)

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
