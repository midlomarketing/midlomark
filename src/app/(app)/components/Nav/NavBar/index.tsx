'use client'
import {NavItem} from '../NavItem'
import classes from './index.module.scss'
import {YesOrNo} from '@/app/(app)/utils/types'
import {useEffect, useState} from 'react'
import {usePathname} from 'next/navigation'
import {MenuIcon} from "../MenuIcon";


export function NavBar({navLinks}: {
    navLinks: {
        disabled: boolean
        id: string
        name: string
        link: {
            value: {
                slug: string
            }
        }
        linkType: string
        openInNewTab: YesOrNo
    }[]
}) {
    const currentRoute = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    function handleClick() {
        setIsOpen((current) => !current)
    }

    useEffect(() => {
        setIsOpen(false)
        window.onresize = function () {
            const w = window.outerWidth
            if (w > 690) {
                setIsOpen(false)
            }
        } // Close the navigation panel
    }, [currentRoute])

    return (
        <>
            <MenuIcon isOpen={isOpen} handleClick={handleClick} />
            <div className={`${classes.navLinks} ${isOpen ? classes.navActive : classes.navHidden}`}>
                {navLinks
                    .filter((item) => !item?.disabled)
                    .map((item, i, {length}) => (
                        <NavItem
                            key={item.id}
                            {...item}
                            lastItem={i + 1 === length}
                        />
                    ))}
            </div>
        </>
    )
}
