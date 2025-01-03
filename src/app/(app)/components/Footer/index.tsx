import {ContentContainer, SectionContainer} from "@/app/(app)/components/PageLayout";
import classes from './index.module.scss'
import {GlobalSetting, Nav as Navigation} from "@/payload-types";
import {getCachedGlobal} from "@/app/(app)/utils/getGlobals";
import Link from "next/link";
import {ImageObject, LogoObject} from "@/app/(app)/components/Media/Media/ImageObject";
import {ImageObject as ImageObjectType} from "@/app/(app)/components/Media/Media/types";
import {Logo} from "@/app/(app)/components/Nav/Logo";

export async function Footer() {

    const response: Navigation = await getCachedGlobal('nav', 1)()
    const globals: GlobalSetting = await getCachedGlobal('global-settings', 1)()

    const image: ImageObjectType = {
        image: {
            width: typeof globals.logos?.landscapeLogo !== 'string' && globals.logos?.landscapeLogo?.width || 640,
            height: typeof globals.logos?.landscapeLogo !== 'string' && globals.logos?.landscapeLogo?.height || 360,
            altDescription: typeof globals.logos?.landscapeLogo !== 'string' && globals.logos?.landscapeLogo?.altDescription || '',
            filename: typeof globals.logos?.landscapeLogo !== 'string' && globals.logos?.landscapeLogo?.filename || '',
        }
    }

    return <SectionContainer className={classes.footerSection}>
        <ContentContainer>
            <div className={classes.logoContainer}>
                <ImageObject
                    filename={image?.image?.filename || ''}
              width={image?.image?.width || 640}
              height={image?.image?.height || 360}
              altDescription={image?.image?.altDescription || ''}
              creator={image?.image?.credit?.creator || ''}
              creatorLink={image?.image?.credit?.creatorLink || ''}
              creatorType={image?.image?.credit?.creatorLink || ''}
                    className={classes.logo}
                />
            </div>
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
            <div className={classes.copyright}>
                <span>© NLV Codes {new Date().getFullYear()}</span>
            </div>
        </ContentContainer>
    </SectionContainer>
}