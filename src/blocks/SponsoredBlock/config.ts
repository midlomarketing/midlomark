import {Block} from 'payload'
import {lexicalEditor} from "@payloadcms/richtext-lexical";
import headerSection from "@/components/headerSection";

const SponsoredBlock: Block = {
    slug: 'sponsoredBlock',
    fields: [
        {
            name: 'active',
            label: 'Activate Block',
            type: 'checkbox',
            defaultValue: true,
        },
        headerSection(),
        {
            name: 'link',
            type: 'group',
            fields: [
                {
                    name: 'destination',
                    type: 'text',
                    admin: {
                        description: "Link to the sponsor"
                    }
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
                    name: 'title',
                    type: 'text',
                    admin: {
                        description: 'Use this field to describe what your link does for accessibility'
                    }
                },
                {
                    name: 'cta',
                    label: 'CTA',
                    type: 'text',
                    admin: {
                        description: 'Use this field to edit the default CTA for a sponsored block.'
                    }
                }
            ]
        },
        {
            name: 'sponsoredContent',
            type: 'richText',
            editor: lexicalEditor({}),
            admin: {
                description: "Text for sponsored content."
            }
        }
    ],
  interfaceName: 'SponsoredBlockProps'
}

export default SponsoredBlock
