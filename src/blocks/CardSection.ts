import {Block} from 'payload'
import image from '../components/image'
import headerSection from '../components/headerSection'
import {FixedToolbarFeature, lexicalEditor} from "@payloadcms/richtext-lexical";

const CardSection: Block = {
    slug: 'cardSection',
    fields: [
        {
            name: 'active',
            label: 'Activate Block',
            type: 'checkbox',
            defaultValue: true,
        },
        headerSection(),
        {
            name: 'card',
            type: 'array',
            admin: {
                components: {
                    RowLabel: {
                        path: 'src/components/cardSectionLabels.ts',
                        exportName: 'CardSectionLabels',
                    },
                },
                initCollapsed: true,
            },
            minRows: 2,
            maxRows: 4,
            fields: [
                image(),
                {
                    name: 'cardHeader',
                    type: 'text',
                    admin: {
                        description: 'Title of the image card.',
                    },
                },
                {
                    name: 'cardText',
                    type: 'richText',
                    editor: lexicalEditor({
                        features: ({defaultFeatures}) => [
                            ...defaultFeatures.filter((feature) => ['underline', 'bold', 'italic'].includes(feature.key)),
                            FixedToolbarFeature(),
                        ]
                    }),
                    admin: {
                        description: 'Description of the image card.',
                    },
                },
                {
                    name: 'includeButton',
                    type: 'checkbox',
                    defaultValue: false
                },
                {
                    name: 'button',
                    type: 'group',
                    admin: {
                        condition: (data, siblingData) => {
                            return siblingData.includeButton
                        },
                    },
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                        },
                        {
                            name: 'link',
                            type: 'text',
                        },
                        {
                            name: 'openInNewTab',
                            type: 'checkbox',
                            defaultValue: false,
                            admin: {
                                description: 'Should this open in a new browser window/tab?',
                            },
                        },
                        {
                            name: 'isPrimary',
                            type: 'checkbox',
                        },
                    ],
                  interfaceName: 'CardButtonProps',
                },
            ],
        },
    ],
  interfaceName: 'CardSection',
}

export default CardSection
