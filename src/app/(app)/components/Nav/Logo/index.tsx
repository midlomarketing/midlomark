import classes from "./index.module.scss";
import {ImageObject} from "@/app/(app)/components/Media/Media/ImageObject";
import Link from "next/link";
import {Media} from "@/payload-types";

export function Logo(logo: Media) {
    return <Link href={`/`} className={classes.logo}>
        <ImageObject
            {...logo}
        />
    </Link>
}
