import {Block} from 'payload'
import headerSection from "@/components/headerSection";
import { BoldFeature, FixedToolbarFeature, ItalicFeature, lexicalEditor, UnderlineFeature,  } from '@payloadcms/richtext-lexical';

const TableOfContents: Block = {
    slug: 'tableOfContents',
    labels: {
        plural: 'Tables of Contents',
        singular: 'Table of Contents'
    },
    fields: [
        {
            name: 'active',
            label: 'Activate Block',
            type: 'checkbox',
            defaultValue: true,
        },
        headerSection(),
        {
            name: 'numberedList',
            type: 'checkbox',
            label: 'Do you want the list to be numbered?',
            defaultValue: true
        },
        {
            name: 'tableOfContents',
            label: 'Table of Contents',
            labels: {
                plural: 'Items',
                singular: 'Item'
            },
            type: 'array',
            fields: [
                {
                    name: 'anchor',
                    type: 'text',
                    admin: {
                        description: 'Use this to set a link to navigate to a certain header.'
                    }
                },
                {
                    name: 'headerText',
                    type: 'richText',
                    editor: lexicalEditor({
                        features: ({defaultFeatures}) => [
                            ...defaultFeatures.filter((feature) => ['underline', 'bold', 'italic'].includes(feature.key)),
                            FixedToolbarFeature(),
                        ]
                    })
                },
            ],
        },
    ],
}

export default TableOfContents
