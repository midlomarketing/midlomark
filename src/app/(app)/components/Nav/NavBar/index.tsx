'use client'
import {NavItem} from '../NavItem'
import classes from './index.module.scss'
import {YesOrNo} from '@/app/(app)/utils/types'
import {useEffect, useState} from 'react'
import {usePathname} from 'next/navigation'
import {MenuIcon} from "../MenuIcon";
import type {Nav} from "@/payload-types";

type Props = Nav

export function NavBar(props: Props) {
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
      <MenuIcon isOpen={isOpen} handleClick={handleClick}/>
      <div className={`${classes.navLinks} ${isOpen ? classes.navActive : classes.navHidden}`}>
        {props.navigationLink && props.navigationLink
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
