import {Button, ButtonContainer} from '@/app/(app)/components/Button'
import Header from '../../../app/(app)/components/CustomHeader'
import {ContentWithMapProps} from '@/payload-types'
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {Address} from "@/blocks/ContentWithMap/Component/Address";
import {ContentContainer} from "@/app/(app)/components/PageLayout/ContentContainer";
import Grid from "@/app/(app)/components/PageLayout/Grid";
import classes from './index.module.scss'
import {RichText} from "@/app/(app)/components/RichText";
import {CTAButton} from "@/app/(app)/components/Button/CTAButton";

type Props = ContentWithMapProps

export function ContentWithMap(props: Props) {

  const {
    active,
    headerSection,
    textPosition,
    address,
    content,
    mapLink,
    buttons
  } = props

    if (active) {
        return (
            <SectionContainer>
                <ContentContainer>
                    <Header {...headerSection} />
                    <Grid className={textPosition === 'Right' ? classes.reverse : undefined}>
                        <div className={classes.addressColumn}>
                          {address && typeof address !== 'string' && <Address address={address}
                                    className={textPosition === 'Left' ? classes.addressEnd : classes.addressStart}/>}
                            <div className={classes.textContainer}>
                              {content && <RichText data={content}/>}
                            </div>
                        </div>
                        <div className={classes.mapColumn}>
                            <div className={classes.mapContainer}>
                                <iframe
                                    height="100%"
                                    width="100%"
                                    src={mapLink!}
                                    allowFullScreen={false}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </Grid>

                    {buttons && buttons.length > 0 && (
                        <ButtonContainer>
                            {buttons.map((button) => (
                                <CTAButton
                                    {...button}
                                    key={button.id}
                                />
                            ))}
                        </ButtonContainer>
                    )}
                </ContentContainer>
            </SectionContainer>
        )
    }
}
