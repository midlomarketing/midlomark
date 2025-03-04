import StickyBanner from './StickyBanner'
import {GlobalSetting} from "@/payload-types";
import {getCachedGlobal} from "@/app/(app)/utils/getGlobals";
import {RichText} from "@/app/(app)/components/RichText";

export default async function StickyBannerContainer() {

  const globals: GlobalSetting = await getCachedGlobal('global-settings', 3)()


  return (
    <>
      <StickyBanner>
        {typeof globals.stickyBanner !== 'string' && globals?.stickyBanner?.content && <RichText
          data={globals.stickyBanner?.content}
        />}
      </StickyBanner>
    </>
  )
}
