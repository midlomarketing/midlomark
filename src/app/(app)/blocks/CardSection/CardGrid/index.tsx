import React from "react";
import classes from './index.module.scss'

export function CardGrid({cardLength, children}: {
    cardLength: number;
    children: React.ReactNode;
}) {
    return <div
        className={`${cardLength === 3 ? classes.threeCards : cardLength === 4 ? classes.fourCards : classes.twoCards} ${classes.baseGrid}`}>
        {children}
    </div>
        }