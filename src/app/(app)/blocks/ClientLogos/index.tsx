import Header, {HeaderType} from "../../components/CustomHeader"
import { ImageObject } from "../../components/Media/Media"
import { ImageObject as ImageObjectType } from '../../components/Media/Media/types'
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {ContentContainer} from "@/app/(app)/components/PageLayout/ContentContainer";
import classes from './index.module.scss'
import {Media as MediaProps} from '@/payload-types'

export default function ClientLogos({active, headerSection, logos}: {
    active?: boolean,
    headerSection: HeaderType,
    logos: MediaProps[]
}) {

    if (active) {
        return <SectionContainer>
            <ContentContainer>
                <Header headerLevel={headerSection.headerLevel} headerText={headerSection.headerText}/>
                <div
                    className={classes.logos}>{logos.map((logo, index) => (
                    <ImageObject key={logo.id} className={classes.logo}
                                 image={logo}
                    />
                ))}</div>
            </ContentContainer>
        </SectionContainer>
    }
    }
