import Header, {HeaderType} from '../../components/CustomHeader'
import Card from './Card'
import {ImageObject} from "../../components/Media/Media/types";
import {SectionContainer, ContentContainer} from "../../components/PageLayout";
import {CardGrid} from "../CardSection/CardGrid";

interface CardType {
    image: ImageObject
    cardHeader: string
    includeButton: boolean
    buttons: any
    cardText: any
    id: string
}

export default function CardSection({cards, headerSection, active}: {
    cards: CardType[]
    headerSection: HeaderType
    active?: boolean
}) {
    if (active) {
        return (
            <SectionContainer>
                <ContentContainer>
                    <Header {...headerSection} />
                    <CardGrid cardLength={cards.length}>
                        {cards.map(
                            (card) => (
                                <Card key={card.id} {...card} />
                            ),
                        )}
                    </CardGrid>
                </ContentContainer>
            </SectionContainer>
        )
    }
}
