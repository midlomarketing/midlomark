import {Block} from 'payload'
import image from "@/components/image";
import headerSection from "@/components/headerSection";
import {lexicalEditor} from "@payloadcms/richtext-lexical";
import buttons from "@/components/buttons";

const PainPoints: Block = {
    slug: 'painPoints',
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
            name: 'painPoints',
            maxRows: 5,
            labels: {
                plural: 'Pain Points',
                singular: 'Pain Point',
            },
            fields: [
                image(),
                {
                    type: 'richText',
                    name: 'painPoint',
                    editor: lexicalEditor({}),
                },
                buttons()
            ]
        }
    ]
}

export default PainPoints;