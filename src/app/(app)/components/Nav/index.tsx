import classes from './index.module.scss'
import {getCachedGlobal} from "@/app/(app)/utils/getGlobals";
import {GlobalSetting, Nav as Navigation} from '@/payload-types'
import {Logo} from "./Logo";
import {NavBar} from "../Nav/NavBar";

export async function Nav() {

    const response: Navigation = await getCachedGlobal('nav', 1)()
    const globals: GlobalSetting = await getCachedGlobal('global-settings', 1)()

    return (
        <nav className={`${classes.navContainer}`}>
            <Logo
                width={typeof globals.logos?.squareLogo !== 'string' && globals.logos?.squareLogo?.width || 50}
                height={typeof globals.logos?.squareLogo !== 'string' && globals.logos?.squareLogo?.height || 50}
                altDescription={typeof globals.logos?.squareLogo !== 'string' && globals.logos?.squareLogo?.altDescription || ``}
                credit={typeof globals.logos?.squareLogo !== 'string' && globals.logos?.squareLogo?.credit || {creator: ``, creatorLink: ``, creatorType: undefined}}
                filename={typeof globals.logos?.squareLogo !== 'string' && globals.logos?.squareLogo?.filename || ``}
            />
            <NavBar
                // @ts-ignore
                navLinks={response.navigationLink}
            />
        </nav>
    )
}
