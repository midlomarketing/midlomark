import React from "react";
import classes from './index.module.scss'

export interface HeaderType {
    headerLevel: string,
    headerText: string,
    anchor?: string,
    className?: string,
}

export default function Header({headerLevel, headerText, className, anchor}: HeaderType) {
    const HeadingTag = React.createElement(`${headerLevel}`, {} ,headerText);

    return <div className={`${className} ${classes.header}`} id={anchor}>
        {HeadingTag}
    </div>
}