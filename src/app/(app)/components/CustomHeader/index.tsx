import React from "react";
import classes from './index.module.scss'
import type {HeaderSectionProps} from "@/payload-types";

export interface HeaderType {
    headerLevel: string,
    headerText: string,
    anchor?: string,
    className?: string,
}

export default function Header({headerLevel, headerText, className, anchor}: HeaderSectionProps & React.HTMLAttributes<HTMLDivElement>) {
    const HeadingTag = React.createElement(`${headerLevel}`, {} ,headerText);

    return <div className={`${className} ${classes.header}`} id={anchor || ``}>
        {HeadingTag}
    </div>
}
