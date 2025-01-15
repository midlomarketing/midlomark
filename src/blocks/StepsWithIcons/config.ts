import {Block} from 'payload'
import image from "@/components/image";
import headerSection from "@/components/headerSection";
import { lexicalEditor } from '@payloadcms/richtext-lexical';

const StepsWithIcons: Block = {
    slug: 'stepsWithIcons',
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
                image(),
                {
                    type: 'text',
                    name: 'step'
                },
                {
                    type: 'richText',
                    name: 'content',
                    editor: lexicalEditor({})
                }
            ],
          interfaceName: 'StepsWithIconsArrayProps'
        }
    ],
  interfaceName: 'StepsWithIconsProps'
}

export default StepsWithIcons;
