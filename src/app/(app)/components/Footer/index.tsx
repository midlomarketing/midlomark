import {ContentContainer, SectionContainer} from "@/app/(app)/components/PageLayout";
import classes from './index.module.scss'
import {GlobalSetting, Nav as Navigation} from "@/payload-types";
import {getCachedGlobal} from "@/app/(app)/utils/getGlobals";
import Link from "next/link";
import {ImageObject} from "@/app/(app)/components/Media/Media/ImageObject";
import SocialSection from "@/app/(app)/components/Social/SocialSection";

export async function Footer() {

  const response: Navigation = await getCachedGlobal('nav', 1)()
  const globals: GlobalSetting = await getCachedGlobal('global-settings', 1)()
  const socialMedia = globals.socialLinks && globals.socialLinks

  return <SectionContainer className={classes.footerSection}>
    <ContentContainer>
      {typeof globals.logos?.landscapeLogo !== 'string' && globals.logos?.landscapeLogo &&
        <div className={classes.logoContainer}>
          <ImageObject
            {...globals.logos.landscapeLogo}
            className={classes.logo}
          />
        </div>}
      <div className={classes.navContainer}>
        {response.navigationLink?.map((link) =>
          link.linkType === 'Internal'
            ? <Link href={typeof link.link?.value !== 'string' && `/${link.link?.value.slug}` === 'home'
              ? '/'
              : typeof link.link?.value !== 'string' && link.link?.value.slug || ``}
                    key={link.id}>{typeof link.link?.value !== 'string' && link.link?.value.title}</Link>
            : link.linkType === 'External'
              ? <a key={link.id} href={link.externalLink || ``}>{link.name}</a>
              : <div key={link.id} className={classes.nestedContainer}>
                <span className={classes.nestedHeader}>{link.name}</span>
                {link.nestedLinks?.[0].navigationLink?.map(link => link.linkType === 'Internal' ?
                  <Link href={typeof link.link?.value !== 'string' && link.link?.value.slug === 'home'
                    ? '/'
                    : typeof link.link?.value !== 'string' && link.link?.value.slug || ``}
                        key={link.id}>{typeof link.link?.value !== 'string' && link.link?.value.title}</Link>
                  : link.linkType === 'External'
                    ? <a key={link.id} href={link.externalLink || ``}>{link.name}</a> : '')}
              </div>
        )}
      </div>
      {socialMedia && <SocialSection socialLinks={socialMedia} header={true} className={classes.socialSection}/>}
      <hr className={classes.hr}/>
      <div className={classes.copyright}>
        <span>© NLV Codes {new Date().getFullYear()}</span>
      </div>
    </ContentContainer>
  </SectionContainer>
}
