'use client'
import classes from "./index.module.scss";
import {MouseEventHandler} from "react";


export function MenuIcon({isOpen, handleClick}: { isOpen: boolean, handleClick: MouseEventHandler }) {
    return (
        <div
            className={`${classes.menuIcon} ${isOpen ? classes.navClicked : classes.menuBars}`}
            onClick={handleClick}
        />
    )
}

