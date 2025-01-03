import {Button, ButtonContainer} from '../../components/Button'
import Header, {HeaderType} from '../../components/CustomHeader'
import {SerializeLexical} from '../../components/RichText/Lexical'
import {AButton,
    RichTextType
} from '@/app/(app)/utils/types'
import {Address as AddressType} from '@/payload-types'
import {SectionContainer} from "@/app/(app)/components/PageLayout";
import {Address} from "@/app/(app)/blocks/ContentWithMap/Address";
import {ContentContainer} from "@/app/(app)/components/PageLayout/ContentContainer";
import Grid from "@/app/(app)/components/PageLayout/Grid";
import classes from './index.module.scss'


export default function ContentWithMap({active, headerSection, textPosition, buttons, address, mapLink,
                                           content
}: {
    active?: boolean
    headerSection: HeaderType
    buttons?: AButton[]
    address: AddressType
    mapLink: string
    textPosition: string
    content?: RichTextType;
}) {
    if (active) {
        return (
            <SectionContainer>
                <ContentContainer>
                    <Header {...headerSection} />
                    <Grid className={textPosition === 'Right' ? classes.reverse : undefined}>
                        <div className={classes.addressColumn}>
                            <Address address={address}
                                     className={textPosition === 'Left' ? classes.addressEnd : classes.addressStart}/>
                            <div className={classes.textContainer}>
                                <SerializeLexical nodes={content?.root.children}/>
                            </div>
                        </div>
                        <div className={classes.mapColumn}>
                            <div className={classes.mapContainer}>
                                <iframe
                                    height="100%"
                                    width="100%"
                                    src={mapLink}
                                    allowFullScreen={false}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </Grid>

                    {buttons && buttons.length > 0 && (
                        <ButtonContainer>
                            {buttons.map((button: AButton) => (
                                <Button
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
