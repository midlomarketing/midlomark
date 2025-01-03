import StickyBanner from './StickyBanner'
import {SerializeLexical} from '../../RichText/Lexical'
import {GlobalSetting} from "@/payload-types";
import {getCachedGlobal} from "@/app/(app)/utils/getGlobals";

// const payload = await getPayloadHMR({config: configPromise})

export default async function StickyBannerContainer() {

    const globals: GlobalSetting = await getCachedGlobal('global-settings', 3)()


    return (
        <>
            <StickyBanner>
                <p>Placeholder</p>
                <SerializeLexical
                    nodes={
                        (typeof globals.stickyBanner !== 'string' &&
                            globals.stickyBanner?.content?.root.children) ||
                        []
                    }
                />
            </StickyBanner>
        </>
    )
}
