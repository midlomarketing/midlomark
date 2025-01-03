import Header, {HeaderType} from "../../components/CustomHeader"
import { ImageObject } from "../../components/Media/Media"
import { ImageObject as ImageObjectType } from '../../components/Media/Media/types'
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {ContentContainer} from "@/app/(app)/components/PageLayout/ContentContainer";
import classes from './index.module.scss'

export default function ClientLogos({active, headerSection, logos}: {
    active?: boolean,
    headerSection: HeaderType,
    logos: {
        image: ImageObjectType
        id: string
    }[]
}) {

    if (active) {
        return <SectionContainer>
            <ContentContainer>
                <Header headerLevel={headerSection.headerLevel} headerText={headerSection.headerText}/>
                <div
                    className={classes.logos}>{logos.map((logo, index) => (
                    <ImageObject key={logo.id} className={classes.logo} filename={logo?.image?.image?.filename || ''}
              width={logo?.image?.image?.width || 640}
              height={logo?.image?.image?.height || 360}
              altDescription={logo?.image?.image?.altDescription || ''}
              creator={logo?.image?.image?.credit?.creator || ''}
              creatorLink={logo?.image?.image?.credit?.creatorLink || ''}
              creatorType={logo?.image?.image?.credit?.creatorLink || ''}/>
                ))}</div>
            </ContentContainer>
        </SectionContainer>
    }
    }
