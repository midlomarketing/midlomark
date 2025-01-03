import classes from "./index.module.scss";
import {LogoObject} from "@/app/(app)/components/Media/Media/ImageObject";
import Link from "next/link";
import {LogoObjectType} from "@/app/(app)/components/Media/Media/types";

export function Logo(logo: LogoObjectType) {
    return <Link href={`/`} className={classes.logo}>
        <LogoObject
            image={logo}
        />
    </Link>
}