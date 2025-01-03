import {Block} from 'payload'
import headerSection from "@/components/headerSection";

const Steps: Block = {
    slug: 'steps',
    fields: [
        {
            name: 'active',
            label: 'Activate Block',
            type: 'checkbox',
            defaultValue: true,
        },
        headerSection(),
        {
            type: 'array',
            name: 'steps',
            maxRows: 5,
            labels: {
                plural: 'Steps',
                singular: 'Step',
            },
            fields: [
                {
                    type: 'text',
                    name: 'step'
                }
            ]
        }
    ]
}

export default Steps;