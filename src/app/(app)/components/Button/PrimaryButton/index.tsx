import Link from "next/link";
import React from "react";
import {YesOrNo} from "@/app/(app)/utils/types";
import classes from './index.module.scss'
import {Industry, Page, Post} from "@/payload-types";

export function PrimaryButton({className, openInNewTab, link, label, title, internalLink, linkType}: {
    className?: string | null
    openInNewTab?: boolean | null | YesOrNo
    link?: string | null
    label?: string | null
    title?: string | null
  internalLink?: Page | Post | Industry
  linkType?: string
}) {

  const reference = linkType === 'External' ? link : `/${internalLink?.value.slug}`

    return <Link href={reference || ``} target={openInNewTab ? '_blank' : '_self'}
                 className={`${className} ${classes.primaryBtn}`} title={label || ``}
    >
        {title}
    </Link>
}
