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
          {globals.logos?.squareLogo && typeof globals.logos.squareLogo !== 'string' && <Logo
            {...globals.logos?.squareLogo}
          />}
            <NavBar
                {...response}
            />
        </nav>
    )
}
