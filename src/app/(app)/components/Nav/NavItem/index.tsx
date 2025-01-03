'use client'
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import {usePathname} from 'next/navigation'
import classes from './index.module.scss'
import {YesOrNo} from "@/app/(app)/utils/types";

export function NavItem({name, link, className, nestedLinks, linkType, openInNewTab, externalLink, lastItem,}: {
    name: string
    link: {
        value: {
            slug: string
        }
    }
    linkType: string
    openInNewTab: YesOrNo
    className?: string
    nestedLinks?: {
        navigationLink: {
            id: string
            name: string
            externalLink: string
            link: {
                value: {
                    slug: string
                }
            }
            linkType: string
        }[]
    }[]
    externalLink?: string
    lastItem?: boolean
}) {
    const pathname = usePathname()
    const [isClicked, setIsClicked] = useState(false)

    // console.log(pathname)

    function handleClick() {
        setIsClicked((current) => !current)
    }

    useEffect(() => {
        setIsClicked(false) // Close the navigation panel
    }, [pathname])

    if (linkType === 'External') {
        return (
            <a
                rel={`noreferrer noopener`}
                href={externalLink}
                target={openInNewTab === 'No' ? `_self` : `_blank`}
                className={`${className} ${lastItem ? classes.lastItem : classes.listItem}`}
                title={`Navigate to the ${name} page`}
                aria-label={`Navigate to the ${name} page`}
            >
                <span className={` ${externalLink && pathname.includes(externalLink) ? classes.active : undefined}`}>
                    {name}
                </span>
            </a>
        )
    } else if (linkType === 'Internal') {
        const isHome = link.value.slug === 'home'
        return (
            <Link
                href={isHome ? `/` : `/${link.value.slug}`}
                target={openInNewTab === 'Yes' ? `_blank` : `_self`}
                className={`${lastItem ? classes.lastItem : classes.listItem} ${className} ${
                    isHome && pathname === '/' ? classes.activeContainer : pathname.includes(link.value.slug) ? classes.activeContainer : undefined
                }`}
                title={`Navigate to the ${name} page`}
                aria-label={`Navigate to the ${name} page`}
            >
                <span className={`${isHome && pathname === '/' ? classes.active : pathname.includes(link.value.slug) ? classes.active : undefined}`}>
                    {name}
                </span>
            </Link>
        )
    } else {
        return (
            <>
                <button
                    className={`${className} ${lastItem ? classes.lastItem : classes.listItem} ${classes.dropdown}`}
                    onClick={handleClick}
                    title={`Click to reveal information pages.`}
                    aria-label={`Click to reveal information pages.`}
                >
                    {name}
                </button>
                {nestedLinks !== undefined && (
                    <div className={`${classes.dropdownMenu} ${isClicked ? classes.show : undefined}`}>
                        {nestedLinks[0].navigationLink?.map((item) =>
                            item.linkType === 'Internal' ? (
                                <Link
                                    key={item.id}
                                    href={`/${item.link.value.slug}`}
                                    target={openInNewTab === 'Yes' ? `_blank` : `_self`}
                                    className={`${classes.listItem} ${pathname.includes(item.link.value.slug) ? classes.activeContainer : undefined}`}
                                    aria-label={`Navigate to the ${item.name} page`}
                                >
                                    <span className={`${pathname.includes(item.link.value.slug) ? classes.active : undefined}`}>
                                        {item.name}
                                    </span>
                                </Link>
                                ) : (
                                    <a
                                        rel={`noreferrer noopener`}
                                        key={item.id}
                                        href={item.externalLink}
                                        target={openInNewTab  === 'No' ? `_self` : `_blank`}
                                        className={classes.listItem}
                                        title={`Navigate to the ${item.name} page`}
                                        aria-label={`Navigate to the ${item.name} page`}
                                    >
                                        <span className={`${pathname.includes(item.externalLink) ? classes.active : undefined}`}>
                                            {item.name}
                                        </span>
                                    </a>
                            ),
                        )}
                    </div>
                )}
            </>
        )
    }
}
