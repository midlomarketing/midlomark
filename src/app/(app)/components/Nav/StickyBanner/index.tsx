import StickyBanner from './StickyBanner'
import {GlobalSetting} from "@/payload-types";
import {getCachedGlobal} from "@/app/(app)/utils/getGlobals";
import {RichText} from "@/app/(app)/components/RichText";

// const payload = await getPayloadHMR({config: configPromise})

export default async function StickyBannerContainer() {

  const globals: GlobalSetting = await getCachedGlobal('global-settings', 3)()


  return (
    <>
      <StickyBanner>
        <p>Placeholder</p>
        {typeof globals.stickyBanner !== 'string' && globals?.stickyBanner?.content && <RichText
          data={
            (globals.stickyBanner?.content) ||
            []
          }
        />}
      </StickyBanner>
    </>
  )
}
