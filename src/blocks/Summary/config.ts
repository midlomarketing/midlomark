import {Block} from 'payload'
import headerSection from "@/components/headerSection";

const SummaryBlock: Block = {
    slug: 'summaryBlock',
    fields: [
        {
            name: 'active',
            label: 'Activate Block',
            type: 'checkbox',
            defaultValue: true,
        },
        headerSection(),
        {
            name: 'summary',
            type: 'text',
            maxLength: 200,
            admin: {
                description: "A short summary of the article or page."
            }
        }
    ],
  interfaceName: 'SummaryProps'
}

export default SummaryBlock
