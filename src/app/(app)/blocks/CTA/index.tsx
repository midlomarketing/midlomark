import {Button, ButtonContainer} from '../../components/Button'
import {AButton} from '@/app/(app)/utils/types'
import classes from './index.module.scss'
import {ContentContainer} from "@/app/(app)/components/PageLayout";

export default function CTA({button}: { button: AButton[] }) {
    return (
        <ContentContainer>
            <ButtonContainer numberOfButtons={button.length} className={classes.ctaContainer}>
                {button.map((btn: AButton) => (
                    <Button
                        key={btn.id}
                        {...btn}
                    />
                ))}
            </ButtonContainer>
        </ContentContainer>
    )
}
