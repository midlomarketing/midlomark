import {Block} from 'payload'
import image from "@/components/image";
import headerSection from "@/components/headerSection";

const ClientLogos: Block = {
    slug: 'clientLogos',
    fields: [
        {
            name: 'active',
            label: 'Activate Block',
            type: 'checkbox',
            defaultValue: true,
        },
        headerSection(),
        {
            name: 'logos',
            label: 'Client Logos',
            type: 'array',
            labels: {
                plural: 'Logos',
                singular: 'Logo'
            },
            fields: [
                image(),
                {
                    type: 'text',
                    name: 'clientLink',
                }
            ]
        }
    ]
}

export default ClientLogos;