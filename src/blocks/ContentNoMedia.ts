import {Block} from 'payload'
import headerSection from '../components/headerSection'
import {lexicalEditor} from "@payloadcms/richtext-lexical";
import {HighlightFeature} from "@/utilities/features/colorAccent/server";

const ContentNoMedia: Block = <Block>{
    slug: 'contentNoMedia',
    fields: [
        {
            name: 'active',
            label: 'Activate Block',
            type: 'checkbox',
            defaultValue: true,
        },
        headerSection(),
        {
            name: 'content',
            type: 'richText',
            editor: lexicalEditor({
                features: ({defaultFeatures}) => [...defaultFeatures,
                    HighlightFeature()
                ]
            }),
        },
      {
        name: 'includeBgColor',
        defaultValue: true,
        type: 'checkbox',
        label: 'Do you want to include the primary background color?'
      },
    ],
}

export default ContentNoMedia
