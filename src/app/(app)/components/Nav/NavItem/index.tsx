'use client'
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import {usePathname} from 'next/navigation'
import classes from './index.module.scss'
import type {NavLinksProps} from '@/payload-types'

type Props = NonNullable<NavLinksProps>[number] & { className?: string, lastItem?: boolean }


export function NavItem(props: Props) {
  const pathname = usePathname()
  const [isClicked, setIsClicked] = useState(false)

  const {
    linkType,
    externalLink,
    openInNewTab,
    className,
    lastItem,
    name,
    link,
    nestedLinks
  } = props
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
        href={externalLink!}
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
    const isHome = link?.value && typeof link.value !== 'string' && link.value.slug === 'home'
    // console.log(link.relationTo)
    return (
      <Link
        href={isHome ? `/` : `/${link?.value && typeof link.value !== 'string' && link.value.slug}`}
        target={openInNewTab === 'Yes' ? `_blank` : `_self`}
        className={`${lastItem ? classes.lastItem : classes.listItem} ${className} ${
          isHome && pathname === '/' ? classes.activeContainer : pathname.includes(typeof link?.value !== 'string' && link?.value.slug || ``) ? classes.activeContainer : undefined
        }`}
        title={`Navigate to the ${name} page`}
        aria-label={`Navigate to the ${name} page`}
      >
                <span
                  className={`${isHome && pathname === '/' ? classes.active : pathname.includes(typeof link?.value !== 'string' && link?.value.slug || ``) ? classes.active : undefined}`}>
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
            {nestedLinks?.[0].navigationLink?.map((item) =>
              item.linkType === 'Internal' ? (
                typeof item.link?.value !== 'string' && <Link
                key={item.id}
                href={`/${item.link?.relationTo === 'industries' ? `industries/${item.link.value.slug}` : item.link?.value.slug}`}
                target={openInNewTab === 'Yes' ? `_blank` : `_self`}
                className={`${classes.listItem} ${pathname.includes(item.link?.value.slug!) ? classes.activeContainer : undefined}`}
                aria-label={`Navigate to the ${item.name} page`}
              >
                                    <span
                                      className={`${pathname.includes(item.link?.value.slug!) ? classes.active : undefined}`}>
                                        {item.name}
                                    </span>
              </Link>
              ) : (
                <a
                  rel={`noreferrer noopener`}
                  key={item.id}
                  href={item.externalLink!}
                  target={openInNewTab === 'No' ? `_self` : `_blank`}
                  className={classes.listItem}
                  title={`Navigate to the ${item.name} page`}
                  aria-label={`Navigate to the ${item.name} page`}
                >
                                        <span
                                          className={`${pathname.includes(item.externalLink!) ? classes.active : undefined}`}>
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
