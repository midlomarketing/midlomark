import Link from "next/link";
import React from "react";
import {YesOrNo} from "@/app/(app)/utils/types";
import classes from './index.module.scss'

export function SecondaryButton({className, openInNewTab, link, label, title}: {
    className?: string | null
    openInNewTab?: boolean | null | YesOrNo
    link?: string | null
    label?: string | null
    title?: string | null
}) {
    return <Link href={link || ``} target={openInNewTab || !link?.includes('localhost') ? '_blank' : '_self'}
                 className={`${className} ${classes.secondaryBtn}`} title={label || ``}
    >
        {title}
    </Link>
}