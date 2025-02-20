import Link from "next/link";
import React from "react";
import classes from './index.module.scss'
import {Button} from "@/payload-types";

type Props = NonNullable<Button>[number] & { className?: string };

export function CTAButton(props: Props) {

  const {
    link,
    linkType,
    openInNewTab,
    className,
    title,
    internalLink,
    isPrimary
  } = props

  const reference = linkType === 'External'
    ? link
    : internalLink?.relationTo !== 'pages'
      ? `/${typeof internalLink?.value !== 'string' && `${internalLink?.relationTo}/${internalLink?.value.slug}`}`
      : typeof internalLink?.value !== 'string' && internalLink?.value.slug === 'home'
        ? '/'
        : `/${typeof internalLink?.value !== 'string' && `${internalLink?.value.slug}`}`

  return <Link href={reference || ``} target={openInNewTab ? '_blank' : '_self'}
               className={`${className} ${isPrimary ? classes.primaryBtn : classes.secondaryBtn}`} title={title || ``}
  >
    {title}
  </Link>
}
