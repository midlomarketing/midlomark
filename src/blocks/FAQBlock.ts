import {Block} from 'payload'
import {HTMLConverterFeature, lexicalEditor, lexicalHTML} from "@payloadcms/richtext-lexical";
import headerSection from "@/components/headerSection";

const FAQBlock: Block = {
    slug: 'faqBlock',
    fields: [
        {
            name: 'active',
            label: 'Activate Block',
            type: 'checkbox',
            defaultValue: true,
        },
        headerSection(),
        {
            name: 'FAQ',
            label: 'FAQ',
            labels: {
                plural: 'FAQs',
                singular: 'FAQ'
            },
            type: 'array',
            fields: [
                {
                    name: 'question',
                    type: 'richText',
                },
                {
                    name: 'answer',
                    type: 'richText',
                    editor:
                        lexicalEditor({
                            features: ({defaultFeatures}) => [...defaultFeatures.filter((feature) => ['underline', 'bold', 'italic'].includes(feature.key)), HTMLConverterFeature({})],
                        }),
                },
                lexicalHTML('answer', {name: 'answer_html'}),
            ]
        },
    ],
}

export default FAQBlock;