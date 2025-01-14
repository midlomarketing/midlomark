import Header, {HeaderType} from '../../components/CustomHeader'
import Card from './Card'
import {ImageObject} from "../../components/Media/Media/types";
import {SectionContainer, ContentContainer} from "../../components/PageLayout";
import {CardGrid} from "../CardSection/CardGrid";
import type {
  CardSection as CardSectionProps
} from "@/payload-types";

export default function CardSection(cards: CardSectionProps) {
  console.log(cards.cards)

  if (cards.active) {
    return (
      <SectionContainer>
        <ContentContainer>
          <Header {...cards.headerSection} />
          {cards.card && <CardGrid cardLength={cards.card.length}>
            {cards.card.map((card) => (
              <Card
                {...card}
                key={card.id}
                // image={card.image?.image}
                //     cardHeader={card.cardHeader || ``}
                //     includeButton={card.includeButton || true}
                //     cardText={card.cardText!}
              />
            ))}
          </CardGrid>}
        </ContentContainer>
      </SectionContainer>
    )
  }
}

// export default function CardSection({cards, headerSection, active}: {
//   cards: CardProps[]
//   headerSection: HeaderSectionProps
//   active?: boolean
// }) {
//   if (active) {
//     return (
//       <SectionContainer>
//         <ContentContainer>
//           <Header {...headerSection} />
//           <CardGrid cardLength={cards.length}>
//             {cards.map(
//               (card, idx) => (
//                 <Card key={idx} {...card} />
//               ),
//             )}
//           </CardGrid>
//         </ContentContainer>
//       </SectionContainer>
//     )
//   }
// }
